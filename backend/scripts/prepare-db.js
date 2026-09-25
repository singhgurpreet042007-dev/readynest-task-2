const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');

if (!fs.existsSync(schemaPath)) {
  console.error(`[prepare-db] Schema not found at: ${schemaPath}`);
  process.exit(1);
}

let schemaContent = fs.readFileSync(schemaPath, 'utf8');

// Read DATABASE_URL from environment or fallback to .env file if available
let databaseUrl = process.env.DATABASE_URL || '';
if (!databaseUrl) {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^DATABASE_URL=["']?([^"'\r\n]+)["']?/m);
    if (match) {
      databaseUrl = match[1];
    }
  }
}

let targetProvider = 'sqlite';
if (databaseUrl.startsWith('postgresql://') || databaseUrl.startsWith('postgres://')) {
  targetProvider = 'postgresql';
} else if (databaseUrl.startsWith('mysql://')) {
  targetProvider = 'mysql';
} else if (databaseUrl.startsWith('sqlserver://')) {
  targetProvider = 'sqlserver';
} else {
  targetProvider = 'sqlite';
}

console.log(`[prepare-db] Target database provider: "${targetProvider}" (based on DATABASE_URL)`);

// Update provider in datasource db block
const updatedContent = schemaContent.replace(
  /(datasource\s+db\s*\{[\s\S]*?provider\s*=\s*["'])(\w+)(["'][\s\S]*?\})/,
  `$1${targetProvider}$3`
);

if (schemaContent !== updatedContent) {
  fs.writeFileSync(schemaPath, updatedContent, 'utf8');
  console.log(`[prepare-db] ✅ Updated prisma/schema.prisma provider to "${targetProvider}".`);
} else {
  console.log(`[prepare-db] prisma/schema.prisma is already set to "${targetProvider}".`);
}
