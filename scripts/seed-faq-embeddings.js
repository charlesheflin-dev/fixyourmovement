// scripts/seed-faq-embeddings.js
// One-time script to embed FAQ knowledge base into Supabase.
// Run from the website repo root: node scripts/seed-faq-embeddings.js
//
// Required .env variables:
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//   OPENAI_API_KEY
//
// Required packages (install in website repo):
//   npm install @supabase/supabase-js openai dotenv

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Config ──────────────────────────────────────────────────────────────────

const KNOWLEDGE_BASE_DIR = path.join(__dirname, '..', 'faq-knowledge-base');

// agent-goals.md is hardcoded in the Edge Function — do NOT embed it
const FILES_TO_EMBED = [
  'clinical-plantar-fasciitis.md',
  'app-behavior.md',
  'website-conversion-knowledge.md',
  'research-layer.md',
];

const OPENAI_MODEL = 'text-embedding-3-small';
const COST_PER_MILLION_TOKENS = 0.02; // $0.02 per 1M tokens

// ── Clients ──────────────────────────────────────────────────────────────────

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ── Chunking ─────────────────────────────────────────────────────────────────

/**
 * Splits a markdown file into chunks by ## headings.
 * Each chunk includes the heading line + all content until the next ## heading.
 * Strips leading/trailing whitespace. Skips empty chunks.
 */
function chunkByHeading(content, filename) {
  const lines = content.split('\n');
  const chunks = [];
  let currentChunk = [];

  for (const line of lines) {
    if (line.startsWith('## ') && currentChunk.length > 0) {
      const text = currentChunk.join('\n').trim();
      if (text.length > 0) chunks.push(text);
      currentChunk = [line];
    } else {
      currentChunk.push(line);
    }
  }

  // Push the last chunk
  if (currentChunk.length > 0) {
    const text = currentChunk.join('\n').trim();
    if (text.length > 0) chunks.push(text);
  }

  console.log(`  → ${chunks.length} chunks from ${filename}`);
  return chunks;
}

// ── Embedding ─────────────────────────────────────────────────────────────────

async function embedText(text) {
  const res = await openai.embeddings.create({
    model: OPENAI_MODEL,
    input: text,
  });
  return res.data[0].embedding;
}

// Rough token estimate: ~4 chars per token
function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n=== FAQ Knowledge Base Seed Script ===\n');

  // Validate env
  if (!process.env.SUPABASE_URL) throw new Error('Missing SUPABASE_URL in .env');
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY in .env');
  if (!process.env.OPENAI_API_KEY) throw new Error('Missing OPENAI_API_KEY in .env');

  // Idempotent: clear existing embeddings before re-inserting
  console.log('Clearing existing faq_embeddings...');
  const { error: deleteError } = await supabase
    .from('faq_embeddings')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000'); // delete all rows

  if (deleteError) {
    console.error('Failed to clear faq_embeddings:', deleteError.message);
    process.exit(1);
  }
  console.log('Cleared.\n');

  // Collect all chunks across all files
  const allChunks = [];

  for (const filename of FILES_TO_EMBED) {
    const filepath = path.join(KNOWLEDGE_BASE_DIR, filename);

    if (!fs.existsSync(filepath)) {
      console.warn(`WARNING: ${filepath} not found — skipping.`);
      continue;
    }

    console.log(`Reading ${filename}...`);
    const content = fs.readFileSync(filepath, 'utf-8');
    const chunks = chunkByHeading(content, filename);
    const sourceFile = filename.replace('.md', '');

    chunks.forEach((chunk, index) => {
      allChunks.push({ sourceFile, chunk, chunkIndex: index, filename });
    });
  }

  if (allChunks.length === 0) {
    console.error('No chunks found. Check that faq-knowledge-base/ files exist.');
    process.exit(1);
  }

  console.log(`\nTotal chunks to embed: ${allChunks.length}\n`);

  // Embed and insert each chunk
  let totalTokens = 0;
  let successCount = 0;

  for (let i = 0; i < allChunks.length; i++) {
    const { sourceFile, chunk, chunkIndex, filename } = allChunks[i];
    const tokenEstimate = estimateTokens(chunk);
    totalTokens += tokenEstimate;

    process.stdout.write(
      `Embedding chunk ${i + 1}/${allChunks.length} from ${filename} (~${tokenEstimate} tokens)... `
    );

    try {
      const embedding = await embedText(chunk);

      const { error: insertError } = await supabase.from('faq_embeddings').insert({
        source_file: sourceFile,
        chunk_index: chunkIndex,
        content: chunk,
        embedding: JSON.stringify(embedding),
      });

      if (insertError) {
        console.error(`\nInsert error for chunk ${i + 1}:`, insertError.message);
      } else {
        successCount++;
        console.log('✓');
      }
    } catch (err) {
      console.error(`\nEmbedding error for chunk ${i + 1}:`, err.message);
    }

    // Small delay to avoid rate limiting
    if (i < allChunks.length - 1) {
      await new Promise((r) => setTimeout(r, 100));
    }
  }

  // Summary
  const costEstimate = (totalTokens / 1_000_000) * COST_PER_MILLION_TOKENS;

  console.log('\n=== Seed Complete ===');
  console.log(`Chunks embedded: ${successCount}/${allChunks.length}`);
  console.log(`Estimated tokens: ${totalTokens.toLocaleString()}`);
  console.log(`Estimated cost: $${costEstimate.toFixed(6)} (text-embedding-3-small @ $${COST_PER_MILLION_TOKENS}/1M tokens)`);

  if (successCount < allChunks.length) {
    console.warn(`\nWARNING: ${allChunks.length - successCount} chunk(s) failed to embed.`);
    process.exit(1);
  }

  console.log('\nAll chunks embedded successfully. The FAQ agent is ready.\n');
}

main().catch((err) => {
  console.error('\nFatal error:', err.message);
  process.exit(1);
});
