const { execSync } = require('child_process');
const path = require('path');

const backendDir = path.join(__dirname, '..');

console.log('====================================================');
console.log('🚀 Smart Campus Backend - Starting Live Server');
console.log('====================================================');

// 1. Prepare Prisma schema based on DATABASE_URL
try {
  require('./prepare-db.js');
} catch (err) {
  console.warn('[start-server] Prepare-db note:', err.message);
}

// 2. Sync database schema (create tables automatically)
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

// 3. Start the compiled Express server (seeding runs inside server on boot)
console.log('[start-server] Launching Express Application...');
require('../dist/server.js');
