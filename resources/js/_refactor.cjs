/**
 * Batch refactoring script for SPMI STIKES frontend.
 * 
 * This script processes all remaining .jsx files in the Pages directory:
 * 1. Replaces `import Swal from 'sweetalert2'` with crudService import
 * 2. Replaces `import { ..., useForm } from '@inertiajs/react'` (removes useForm)
 * 3. Replaces local `const statusColors = {...}` with constants import
 * 4. Replaces local `const jenisColors = {...}` with constants import
 * 5. Replaces `handleDelete(...)` calls with `service.delete(...)`
 * 
 * Run: node resources/js/_refactor.cjs
 */

const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'Pages');

// Files already refactored — skip them
const skipFiles = new Set([
    'Dashboard/Index.jsx',
    'Dashboard/Temuan/Index.jsx',
    'Dashboard/Audit/Index.jsx',
    'Dashboard/SiklusAudit/Index.jsx',
    'Dashboard/StandarMutu/Index.jsx',
    'Dashboard/UnitKerja/Index.jsx',
    'Dashboard/TindakLanjut/Index.jsx',
    'Auditee/Index.jsx',
    'Auditee/Temuan.jsx',
    'Auditee/ShowTemuan.jsx',
].map(f => f.replace(/\//g, path.sep)));

// Walk directory recursively for .jsx files
function walkDir(dir) {
    let results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) results.push(...walkDir(full));
        else if (entry.name.endsWith('.jsx')) results.push(full);
    }
    return results;
}

const files = walkDir(pagesDir);
let totalChanged = 0;

for (const file of files) {
    const rel = path.relative(pagesDir, file);
    if (skipFiles.has(rel)) {
        console.log(`SKIP: ${rel}`);
        continue;
    }
    
    let content = fs.readFileSync(file, 'utf-8');
    const original = content;
    let changes = [];

    // 1. Replace local statusColors definitions (single-line)
    if (content.includes("const statusColors = {") && !content.includes("from '@/Utils/constants'")) {
        // Single-line statusColors
        content = content.replace(/const statusColors = \{[^}]+\};?\n?/g, '');
        if (!content.includes("from '@/Utils/constants'")) {
            // Add import after last import line
            const lastImport = content.lastIndexOf("import ");
            const endOfLine = content.indexOf('\n', lastImport);
            const importLine = `\nimport { STATUS_COLORS as statusColors } from '@/Utils/constants';`;
            content = content.slice(0, endOfLine + 1) + importLine + content.slice(endOfLine + 1);
        }
        changes.push('statusColors → constants');
    }

    // 2. Replace local jenisColors definitions (single-line)
    if (content.includes("const jenisColors = {")) {
        content = content.replace(/const jenisColors = \{[^}]+\};?\n?/g, '');
        if (!content.includes("JENIS_COLORS")) {
            // Update the existing STATUS_COLORS import to include JENIS_COLORS
            content = content.replace(
                "import { STATUS_COLORS as statusColors } from '@/Utils/constants';",
                "import { STATUS_COLORS as statusColors, JENIS_COLORS as jenisColors } from '@/Utils/constants';"
            );
        }
        changes.push('jenisColors → constants');
    }

    // 3. Remove `import Swal from 'sweetalert2'` or `import Swal from "sweetalert2"`
    //    Only if the file uses handleDelete pattern (we'll add crudService instead)
    if (content.includes("import Swal from")) {
        // Check if Swal is used for delete confirmation pattern
        const hasSwalDelete = /Swal\.fire\(\{[\s\S]*?title:.*[Hh]apus/.test(content);
        
        if (hasSwalDelete) {
            // Extract the entity route and name from the handleDelete function
            const routeMatch = content.match(/router\.delete\(`([^`]+?)\/\$\{id\}`/);
            const titleMatch = content.match(/title:.*?['"]Hapus (.+?)\?['"]/);
            const warningMatch = content.match(/Peringatan: (.+?)(?:<\/span>|'|")/);
            
            if (routeMatch) {
                const routePrefix = routeMatch[1];
                const entityName = titleMatch ? titleMatch[1] : 'Data';
                const warningMessage = warningMatch ? warningMatch[1] : '';
                
                // Remove handleDelete function
                content = content.replace(
                    /\n?\s*const handleDelete = \(id\) =>\s*\{[\s\S]*?Swal\.fire\(\{[\s\S]*?\}\)\.then\([\s\S]*?\}\);\s*\};?\n?/g,
                    ''
                );
                
                // Add crudService import if not present
                if (!content.includes("createCrudService")) {
                    const lastImport = content.lastIndexOf("import ");
                    const endOfLine = content.indexOf('\n', lastImport);
                    const importLine = `\nimport { createCrudService } from '@/Services/crudService';`;
                    content = content.slice(0, endOfLine + 1) + importLine + content.slice(endOfLine + 1);
                }
                
                // Create service variable name from route
                const serviceName = routePrefix.split('/').pop().replace(/-([a-z])/g, (_, c) => c.toUpperCase()) + 'Service';
                
                // Add service instantiation at the start of function body
                const funcMatch = content.match(/(function \w+\([^)]*\)\s*\{)\n/);
                if (funcMatch) {
                    const serviceCode = `\n    const ${serviceName} = createCrudService({\n        routePrefix: '${routePrefix}',\n        entityName: '${entityName}',\n        warningMessage: '${warningMessage.replace(/'/g, "\\'")}',\n    });\n`;
                    content = content.replace(funcMatch[0], funcMatch[1] + serviceCode + '\n');
                }
                
                // Replace handleDelete(xxx) calls with service.delete(xxx)
                content = content.replace(/handleDelete\(([^)]+)\)/g, `${serviceName}.delete($1)`);
                
                // Remove Swal import only if Swal is no longer used anywhere
                const remainingSwal = (content.match(/Swal\./g) || []).length;
                if (remainingSwal === 0) {
                    content = content.replace(/import Swal from ['"]sweetalert2['"];?\n?/g, '');
                }
                
                changes.push(`handleDelete → ${serviceName}.delete`);
            }
        }
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf-8');
        totalChanged++;
        console.log(`UPDATED: ${rel} (${changes.join(', ')})`);
    } else {
        console.log(`NO CHANGE: ${rel}`);
    }
}

console.log(`\nDone. ${totalChanged} files updated.`);
