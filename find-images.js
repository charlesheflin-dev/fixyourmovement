import fs from 'fs';
import path from 'path';

const rootDir = process.argv[2] || process.cwd();

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Log matching paths before replacement
            const matches = content.match(/['"`]\/images\/[^'"`]+['"`]/g) || [];
            if (matches.length > 0) {
                console.log(`Found in ${fullPath}:`);
                matches.forEach(m => console.log(`  ${m}`));
            }
        }
    }
}

console.log(`Searching in ${rootDir}`);
processDirectory(path.join(rootDir, 'public', 'bonuses'));
