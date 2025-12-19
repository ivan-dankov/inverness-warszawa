#!/usr/bin/env node
/**
 * Start Decap CMS proxy server for local development
 * This allows the CMS to work without authentication on localhost
 */

import { spawn } from 'child_process';

console.log('🚀 Starting Decap CMS proxy server...');
console.log('📝 This enables local backend access without authentication');
console.log('🌐 CMS will be available at http://localhost:8080/admin');
console.log('');

const proxy = spawn('npx', ['decap-server'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd(),
});

proxy.on('error', (error) => {
  console.error('❌ Failed to start proxy server:', error.message);
  console.log('\n💡 Make sure you have decap-server installed:');
  console.log('   npm install -g decap-server');
  process.exit(1);
});

proxy.on('exit', (code) => {
  if (code !== 0) {
    console.error(`\n❌ Proxy server exited with code ${code}`);
  }
});

process.on('SIGINT', () => {
  console.log('\n\n🛑 Stopping proxy server...');
  proxy.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  proxy.kill();
  process.exit(0);
});
