# Pre-Push Hook Setup

คู่มือการตั้งค่า pre-push hook เพื่อรันทดสอบก่อน push code ขึ้น GitHub

## 🎯 วัตถุประสงค์

- รัน lint, format check, และ tests ในเครื่องก่อน push
- ป้องกันการ push code ที่มีปัญหา
- GitHub Actions จะ deploy อัตโนมัติเมื่อ push สำเร็จ

## 📋 วิธีตั้งค่า

### 1. ติดตั้ง Git Hook (Windows PowerShell)

```powershell
# สร้าง symbolic link หรือ copy script
Copy-Item scripts\pre-push.ps1 .git\hooks\pre-push.ps1

# หรือใช้ git hook โดยตรง
node scripts/pre-push.js
```

### 2. ตั้งค่า Git Hook (Linux/Mac)

```bash
# ให้สิทธิ์ execute
chmod +x scripts/pre-push.sh
chmod +x .git/hooks/pre-push

# หรือสร้าง symbolic link
ln -s ../../scripts/pre-push.sh .git/hooks/pre-push
```

### 3. ตั้งค่าอัตโนมัติ (แนะนำ)

เพิ่ม script ใน `package.json`:

```json
{
  "scripts": {
    "prepare": "node scripts/setup-hooks.js"
  }
}
```

## 🚀 วิธีใช้งาน

### รันทดสอบก่อน push (Manual)

```bash
# ใช้ npm script
npm run pre-push

# หรือใช้ bun
bun run pre-push

# หรือใช้ script โดยตรง
node scripts/pre-push.js
```

### Push Code (อัตโนมัติ)

```bash
git add .
git commit -m "Your commit message"
git push
```

เมื่อรัน `git push` hook จะทำงานอัตโนมัติ:
1. ✅ รัน linter
2. ✅ ตรวจสอบ code formatting
3. ✅ รัน unit tests
4. ✅ ถ้าทุกอย่างผ่าน → push สำเร็จ
5. ❌ ถ้ามี error → หยุด push และแสดง error

## ⚙️ การตั้งค่า

### ข้าม Pre-Push Hook (กรณีฉุกเฉิน)

```bash
# ใช้ --no-verify flag
git push --no-verify
```

⚠️ **คำเตือน**: ใช้เฉพาะกรณีจำเป็นจริงๆ เท่านั้น!

### ปรับแต่ง Checks

แก้ไขไฟล์ `scripts/pre-push.js`:

```javascript
const checks = [
  { command: 'bun run lint', description: '📝 Running linter' },
  { command: 'bun run format:check', description: '✨ Checking code formatting' },
  { command: 'bun run test', description: '🧪 Running tests' },
  // เพิ่มหรือลบ checks ตามต้องการ
];
```

### เพิ่ม E2E Tests

แก้ไข `scripts/pre-push.js` และ uncomment:

```javascript
{ command: 'bun run test:e2e', description: '🧪 Running E2E tests' },
```

## 🔄 GitHub Actions Workflow

เมื่อ push สำเร็จ GitHub Actions จะทำงานอัตโนมัติ:

1. **Test Job**: รัน lint, format check, และ tests
2. **Build Job**: Build Docker image
3. **Security Job**: Security scan
4. **Deploy**: Push image ไป GitHub Container Registry

ดู workflow ได้ที่: `.github/workflows/ci-cd.yml`

## 📝 ตัวอย่าง Output

### ✅ Success

```
🔍 Running pre-push checks...

📝 Running linter...
✅ Linter passed

✨ Checking code formatting...
✅ Formatting check passed

🧪 Running tests...
✅ All tests passed

✅ All pre-push checks passed! Ready to push.
```

### ❌ Failure

```
🔍 Running pre-push checks...

📝 Running linter...
❌ Linter failed. Please fix the errors before pushing.

❌ Pre-push checks failed. Please fix the errors before pushing.
```

## 🛠️ Troubleshooting

### Hook ไม่ทำงาน

1. ตรวจสอบว่าไฟล์มีสิทธิ์ execute:
   ```bash
   chmod +x .git/hooks/pre-push
   ```

2. ตรวจสอบว่า Bun ติดตั้งแล้ว:
   ```bash
   bun --version
   ```

3. รัน manual เพื่อดู error:
   ```bash
   node scripts/pre-push.js
   ```

### Tests ล้มเหลว

1. รัน tests แยก:
   ```bash
   bun run test
   ```

2. ตรวจสอบ test files:
   ```bash
   bun run test:watch
   ```

### Linter Errors

1. แก้ไขอัตโนมัติ:
   ```bash
   bun run lint:fix
   ```

2. Format code:
   ```bash
   bun run format
   ```

## 📚 เอกสารเพิ่มเติม

- [Git Hooks Documentation](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

