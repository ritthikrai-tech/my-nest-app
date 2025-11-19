# Husky Setup Guide

คู่มือการใช้งาน Husky สำหรับ Git Hooks (Pre-commit & Pre-push)

## 📋 สิ่งที่ตั้งค่าไว้

### 1. **Pre-commit Hook**

รันอัตโนมัติเมื่อ `git commit`:

- ✅ Linter (`bun run lint`)
- ✅ Format Check (`bun run format:check`)

### 2. **Pre-push Hook**

รันอัตโนมัติเมื่อ `git push`:

- ✅ Unit Tests (`bun run test`)

## 🚀 การติดตั้ง

### 1. ติดตั้ง Husky

```bash
bun add -d husky
```

### 2. Initialize Husky

```bash
bun run prepare
# หรือ
npx husky install
```

### 3. ตรวจสอบว่า Hooks ถูกสร้างแล้ว

```bash
# ตรวจสอบไฟล์
ls .husky/
# ควรเห็น: pre-commit, pre-push, _/husky.sh
```

## 💻 วิธีใช้งาน

### Commit Code (Pre-commit จะทำงานอัตโนมัติ)

```bash
git add .
git commit -m "Your commit message"
# ← Pre-commit hook จะรันอัตโนมัติ!
```

**ถ้า checks ผ่าน:**

```
🔍 Running pre-commit checks...
📝 Running linter... ✅
✨ Checking code formatting... ✅
✅ Pre-commit checks passed!
[main abc1234] Your commit message
```

**ถ้า checks ล้มเหลว:**

```
🔍 Running pre-commit checks...
📝 Running linter... ❌
❌ Linter failed. Please fix the errors before committing.
   Run 'bun run lint:fix' to auto-fix some issues.
```

### Push Code (Pre-push จะทำงานอัตโนมัติ)

```bash
git push
# ← Pre-push hook จะรันอัตโนมัติ!
```

**ถ้า tests ผ่าน:**

```
🔍 Running pre-push checks...
🧪 Running tests... ✅
✅ Pre-push checks passed! Ready to push.
```

**ถ้า tests ล้มเหลว:**

```
🔍 Running pre-push checks...
🧪 Running tests... ❌
❌ Tests failed. Please fix the failing tests before pushing.
```

## ⚙️ การปรับแต่ง

### แก้ไข Pre-commit Hook

แก้ไขไฟล์ `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# เพิ่ม checks ที่ต้องการ
bun run lint
bun run format:check
# bun run type-check  # ตัวอย่างเพิ่ม type check
```

### แก้ไข Pre-push Hook

แก้ไขไฟล์ `.husky/pre-push`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# เพิ่ม checks ที่ต้องการ
bun run test
# bun run test:e2e  # ตัวอย่างเพิ่ม E2E tests
```

### ข้าม Hooks (กรณีฉุกเฉิน)

```bash
# ข้าม pre-commit
git commit --no-verify -m "Your message"

# ข้าม pre-push
git push --no-verify
```

⚠️ **คำเตือน**: ใช้เฉพาะกรณีจำเป็นจริงๆ เท่านั้น!

## 🔧 Troubleshooting

### Hook ไม่ทำงาน

1. **ตรวจสอบว่า Husky ถูกติดตั้งแล้ว:**

   ```bash
   bun run prepare
   ```

2. **ตรวจสอบสิทธิ์ไฟล์ (Linux/Mac):**

   ```bash
   chmod +x .husky/pre-commit
   chmod +x .husky/pre-push
   ```

3. **ตรวจสอบว่า Bun ติดตั้งแล้ว:**
   ```bash
   bun --version
   ```

### Linter Errors

```bash
# แก้ไขอัตโนมัติ
bun run lint:fix

# Format code
bun run format
```

### Format Check Failed

```bash
# Auto-format
bun run format
```

### Tests Failed

```bash
# รัน tests เพื่อดู error
bun run test

# รัน tests แบบ watch mode
bun run test:watch
```

## 📝 NPM Scripts

- `bun run prepare` - Initialize husky (รันอัตโนมัติหลัง install)
- `bun run pre-commit` - รัน pre-commit checks manual
- `bun run pre-push` - รัน pre-push checks manual

## 🔄 GitHub Actions Integration

เมื่อ push สำเร็จ GitHub Actions จะทำงาน:

1. **Test Job**: รัน lint, format, tests
2. **Build Job**: Build Docker image
3. **Security Job**: Security scan
4. **Deploy**: Push image ไป GitHub Container Registry

## 📚 เอกสารเพิ่มเติม

- [Husky Documentation](https://typicode.github.io/husky/)
- [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
