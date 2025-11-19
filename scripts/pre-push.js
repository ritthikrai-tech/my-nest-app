#!/usr/bin/env node
/**
 * Pre-push hook: Run tests before pushing to GitHub
 * Usage: npm run pre-push
 * This script will be called automatically by git pre-push hook
 */

const { execSync } = require('child_process');
const os = require('os');

const isWindows = os.platform() === 'win32';

function runCommand(command, description) {
  console.log(`\n${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`\n❌ ${description} failed!`);
    return false;
  }
}

function checkBun() {
  try {
    execSync('bun --version', { stdio: 'ignore' });
    return true;
  } catch {
    console.error('❌ Bun is not installed. Please install Bun first.');
    console.error('   Visit: https://bun.sh');
    process.exit(1);
  }
}

console.log('🔍 Running pre-push checks...\n');

// Check if bun is available
checkBun();

// Run checks
const checks = [
  { command: 'bun run lint', description: '📝 Running linter' },
  {
    command: 'bun run format:check',
    description: '✨ Checking code formatting',
  },
  { command: 'bun run test', description: '🧪 Running tests' },
  // Uncomment if you want to run E2E tests (can be slow)
  // { command: 'bun run test:e2e', description: '🧪 Running E2E tests' },
];

let allPassed = true;

for (const check of checks) {
  if (!runCommand(check.command, check.description)) {
    allPassed = false;
    break;
  }
}

if (allPassed) {
  console.log('\n✅ All pre-push checks passed! Ready to push.');
  process.exit(0);
} else {
  console.log('\n❌ Pre-push checks failed. Please fix the errors before pushing.');
  process.exit(1);
}
