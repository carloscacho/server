const fs = require('fs');

const sqlDump = fs.readFileSync('c:/Users/carlo/Documents/Codes/eventosIFMS/u930348059_novo_sis.sql', 'utf8');
const prismaSchema = fs.readFileSync('c:/Users/carlo/Documents/Codes/eventosIFMS/server/prisma/schema.prisma', 'utf8');

const sqlTables = {};
const tableRegex = /CREATE TABLE `([a-zA-Z0-9_]+)` \(([\s\S]*?)\) ENGINE=/g;
let match;
while ((match = tableRegex.exec(sqlDump)) !== null) {
    const tableName = match[1];
    const columnsText = match[2];
    const columns = [];
    const colRegex = /^\s*`([a-zA-Z0-9_]+)`/gm;
    let colMatch;
    while ((colMatch = colRegex.exec(columnsText)) !== null) {
        columns.push(colMatch[1]);
    }
    sqlTables[tableName] = columns;
}

const prismaTables = {};
const modelRegex = /model ([a-zA-Z0-9_]+) {([\s\S]*?)}/g;
let pMatch;
while ((pMatch = modelRegex.exec(prismaSchema)) !== null) {
    const modelName = pMatch[1];
    const fieldsText = pMatch[2];
    const fields = [];
    const fieldRegex = /^\s*([a-zA-Z0-9_]+)\s+([a-zA-Z0-9_]+)(\[\])?(\?)?/gm;
    let fieldMatch;
    while ((fieldMatch = fieldRegex.exec(fieldsText)) !== null) {
        // exclude relations and @@
        const type = fieldMatch[2];
        if (!['String', 'Int', 'Float', 'Boolean', 'DateTime', 'Json', 'Bytes', 'Decimal'].includes(type) && !type.match(/^[a-z]/)) {
            // might be relation
        } else {
            fields.push(fieldMatch[1]);
        }
    }
    // Filter out relations
    prismaTables[modelName] = fields.filter(f => !['@@', '//'].some(prefix => f.startsWith(prefix)));
}

console.log("Missing columns in SQL Dump compared to Prisma Schema:");
for (const model in prismaTables) {
    if (sqlTables[model]) {
        const missing = prismaTables[model].filter(f => !sqlTables[model].includes(f) && prismaTables[model].includes(f));
        // Check if the missing field is actually a relation by checking prisma schema again
        // Let's refine: field has @db. type or is native type
        const realFields = [];
        const lines = prismaSchema.split('\n');
        let inModel = false;
        for (const line of lines) {
            if (line.startsWith(`model ${model} `)) inModel = true;
            if (inModel && line.trim().startsWith('}')) inModel = false;
            
            if (inModel) {
                for (const m of missing) {
                    if (line.trim().startsWith(m + ' ')) {
                        // Check if it's a relation (has @relation or is an array or references another model type)
                        if (!line.includes('@relation') && !line.includes('[]')) {
                            const typePart = line.trim().split(/\s+/)[1];
                            if (['String', 'Int', 'DateTime', 'Boolean', 'Float', 'String?', 'Int?', 'DateTime?', 'Boolean?', 'Float?'].includes(typePart)) {
                                realFields.push(m);
                            }
                        }
                    }
                }
            }
        }
        const uniqueReal = [...new Set(realFields)];
        if (uniqueReal.length > 0) {
            console.log(`Table: ${model} -> Missing columns: ${uniqueReal.join(', ')}`);
        }
    } else {
        console.log(`Table ${model} is entirely missing in SQL Dump!`);
    }
}
