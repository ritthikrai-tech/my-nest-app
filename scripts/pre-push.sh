#!/bin/sh
# Pre-push hook: Run tests before pushing to GitHub

echo "🔍 Running pre-push checks..."

# Check if bun is available
if ! command -v bun &> /dev/null; then
  echo "❌ Bun is not installed. Please install Bun first."
  echo "   Visit: https://bun.sh"
  exit 1
fi

# Run linter
echo "📝 Running linter..."
bun run lint || {
  echo "❌ Linter failed. Please fix the errors before pushing."
  exit 1
}

# Check formatting
echo "✨ Checking code formatting..."
bun run format:check || {
  echo "❌ Code formatting check failed. Run 'bun run format' to fix."
  exit 1
}

# Run tests
echo "🧪 Running tests..."
bun run test || {
  echo "❌ Tests failed. Please fix the failing tests before pushing."
  exit 1
}

# Run E2E tests (optional, can be slow)
# echo "🧪 Running E2E tests..."
# bun run test:e2e || {
#   echo "❌ E2E tests failed. Please fix the failing tests before pushing."
#   exit 1
# }

echo "✅ All pre-push checks passed! Ready to push."
exit 0

