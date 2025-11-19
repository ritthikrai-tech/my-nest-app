# Pre-push hook: Run tests before pushing to GitHub (PowerShell version)

Write-Host "🔍 Running pre-push checks..." -ForegroundColor Cyan

# Check if bun is available
try {
    $null = Get-Command bun -ErrorAction Stop
} catch {
    Write-Host "❌ Bun is not installed. Please install Bun first." -ForegroundColor Red
    Write-Host "   Visit: https://bun.sh" -ForegroundColor Yellow
    exit 1
}

# Run linter
Write-Host "📝 Running linter..." -ForegroundColor Cyan
bun run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Linter failed. Please fix the errors before pushing." -ForegroundColor Red
    exit 1
}

# Check formatting
Write-Host "✨ Checking code formatting..." -ForegroundColor Cyan
bun run format:check
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Code formatting check failed. Run 'bun run format' to fix." -ForegroundColor Red
    exit 1
}

# Run tests
Write-Host "🧪 Running tests..." -ForegroundColor Cyan
bun run test
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Tests failed. Please fix the failing tests before pushing." -ForegroundColor Red
    exit 1
}

# Run E2E tests (optional, can be slow)
# Write-Host "🧪 Running E2E tests..." -ForegroundColor Cyan
# bun run test:e2e
# if ($LASTEXITCODE -ne 0) {
#     Write-Host "❌ E2E tests failed. Please fix the failing tests before pushing." -ForegroundColor Red
#     exit 1
# }

Write-Host "✅ All pre-push checks passed! Ready to push." -ForegroundColor Green
exit 0

