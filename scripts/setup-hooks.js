#!/usr/bin/env node
/**
 * Setup Git Hooks
 * This script will be run automatically after npm install
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const isWindows = os.platform() === 'win32';
const hooksDir = path.join(__dirname, '../.git/hooks');
const prePushScript = path.join(__dirname, 'pre-push.js');
const prePushHook = path.join(hooksDir, 'pre-push');

// Check if .git directory exists
if (!fs.existsSync(path.join(__dirname, '../.git'))) {
  console.log('⚠️  Not a git repository. Skipping hook setup.');
  process.exit(0);
}

// Create hooks directory if it doesn't exist
if (!fs.existsSync(hooksDir)) {
  fs.mkdirSync(hooksDir, { recursive: true });
  console.log('✅ Created .git/hooks directory');
}

// Create pre-push hook
const hookContent = isWindows
  ? `#!/bin/sh
# Git pre-push hook (Windows)
node "${prePushScript.replace(/\\/g, '/')}"
exit $?
`
  : `#!/bin/sh
# Git pre-push hook
node "${prePushScript}"
exit $?
`;

try {
  fs.writeFileSync(prePushHook, hookContent, { mode: 0o755 });
  console.log('✅ Pre-push hook installed successfully');
  console.log('   Hook location:', prePushHook);
} catch (error) {
  console.error('❌ Failed to install pre-push hook:', error.message);
  process.exit(1);
}
