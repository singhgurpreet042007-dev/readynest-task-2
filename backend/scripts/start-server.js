const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const backendDir = path.join(__dirname, '..');

console.log('====================================================');
console.log('🚀 Smart Campus Backend - Booting Server Environment');
console.log('====================================================');

// 1. Prepare Prisma schema based on DATABASE_URL
try {
  require('./prepare-db.js');
} catch (err) {
  console.warn('[start-server] Warning during prepare-db:', err.message);
}

// 2. Generate Prisma Client if not already generated
try {
  console.log('[start-server] Generating Prisma Client...');
  execSync('npx prisma generate', {
    stdio: 'inherit',
    cwd: backendDir,
    env: process.env,
  });
} catch (err) {
  console.warn('[start-server] Warning during prisma generate:', err.message);
}

// 3. Sync database schema (create tables automatically)
try {
  console.log('[start-server] Syncing database schema with live database...');
  execSync('npx prisma db push --accept-data-loss', {
    stdio: 'inherit',
    cwd: backendDir,
    env: process.env,
  });
  console.log('[start-server] ✅ Database schema synced successfully.');
} catch (err) {
  console.warn('[start-server] ⚠️ Note on prisma db push:', err.message);
}

// 4. Run database seed (idempotent upsert)
try {
  console.log('[start-server] Ensuring initial demo accounts and data are seeded...');
  execSync('npx tsx prisma/seed.ts', {
    stdio: 'inherit',
    cwd: backendDir,
    env: process.env,
  });
  console.log('[start-server] ✅ Database seed complete.');
} catch (err) {
  console.warn('[start-server] ⚠️ Note on database seed:', err.message);
}

// 5. Start the compiled Express server
console.log('[start-server] Launching Express Application...');
require('../dist/server.js');
