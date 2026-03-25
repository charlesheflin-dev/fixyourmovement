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
            let modified = false;
            
            // Replace "/images/" with "./images/" and "/downloads/" with "./downloads/"
            // This ensures assets load relative to the bonus subdirectory instead of the root domain.
            if (content.match(/['"`]\/images\//g)) {
                content = content.replace(/(['"`])\/images\//g, '$1./images/');
                modified = true;
                console.log(`Fixed /images/ paths in: ${fullPath}`);
            }
            
            if (content.match(/['"`]\/downloads\//g)) {
                content = content.replace(/(['"`])\/downloads\//g, '$1./downloads/');
                modified = true;
                console.log(`Fixed /downloads/ paths in: ${fullPath}`);
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
            }
        }
    }
}

console.log(`Fixing asset paths in ${rootDir}`);
processDirectory(path.join(rootDir, 'public', 'bonuses'));
