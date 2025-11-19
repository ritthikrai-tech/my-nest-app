# Docker Guide

คู่มือการใช้งาน Docker สำหรับโปรเจกต์ NestJS นี้

## 📋 Prerequisites

- Docker Desktop สำหรับ Windows ([ดาวน์โหลดที่นี่](https://www.docker.com/products/docker-desktop))
- Docker Compose (รวมอยู่ใน Docker Desktop)

## 🚀 Quick Start

### 1. Build Docker Image

```bash
npm run docker:build
```

หรือ

```bash
docker build -t my-nest-app .
```

### 2. Run Container (Production)

```bash
npm run docker:prod
```

หรือ

```bash
docker-compose up --build
```

### 3. Run Container (Development)

```bash
npm run docker:dev
```

หรือ

```bash
docker-compose -f docker-compose.dev.yml up --build
```

## 📝 Docker Commands

### Build Image

```bash
# Build production image
docker build -t my-nest-app .

# Build with specific target
docker build --target production -t my-nest-app .
```

### Run Container

```bash
# Run production container
docker run -p 3000:3000 --env-file .env my-nest-app

# Run with environment variables
docker run -p 3000:3000 -e PORT=3000 -e NODE_ENV=production my-nest-app

# Run in detached mode
docker run -d -p 3000:3000 --name my-nest-app my-nest-app
```

### Docker Compose

```bash
# Start services (production)
docker-compose up

# Start services in background
docker-compose up -d

# Start services and rebuild
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f app
```

### Development Mode

```bash
# Start development container with hot reload
docker-compose -f docker-compose.dev.yml up --build

# Stop development container
docker-compose -f docker-compose.dev.yml down
```

## 🔍 Useful Commands

### View Running Containers

```bash
docker ps
```

### View All Containers

```bash
docker ps -a
```

### View Container Logs

```bash
docker logs my-nest-app
docker logs -f my-nest-app  # Follow logs
```

### Execute Commands in Container

```bash
docker exec -it my-nest-app sh
```

### Stop Container

```bash
docker stop my-nest-app
```

### Remove Container

```bash
docker rm my-nest-app
```

### Remove Image

```bash
docker rmi my-nest-app
```

### Clean Up

```bash
# Remove all stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove everything (careful!)
docker system prune -a
```

## 🌐 Access Application

หลังจากรัน container แล้ว สามารถเข้าถึงได้ที่:

- **API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/docs
- **Health Check**: http://localhost:3000/docs (ใช้สำหรับ healthcheck)

## 🔧 Environment Variables

สร้างไฟล์ `.env` ใน root directory:

```env
PORT=3000
NODE_ENV=production
# เพิ่ม environment variables อื่นๆ ตามต้องการ
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# เปลี่ยน port ใน docker-compose.yml
ports:
  - "3001:3000"  # ใช้ port 3001 แทน
```

### Container Won't Start

```bash
# ดู logs
docker logs my-nest-app

# ตรวจสอบ container status
docker ps -a
```

### Rebuild After Code Changes

```bash
# Development mode จะ hot reload อัตโนมัติ
# Production mode ต้อง rebuild
docker-compose down
docker-compose up --build
```

### Permission Issues (Linux/Mac)

```bash
# ใช้ sudo (ถ้าจำเป็น)
sudo docker-compose up
```

## 📦 Multi-stage Build

Dockerfile ใช้ multi-stage build:

1. **Builder stage**: Build application
2. **Production stage**: รัน application ด้วย production dependencies เท่านั้น

ผลลัพธ์: Image ขนาดเล็กลงและปลอดภัยกว่า

## 🔒 Security

- ใช้ non-root user (`nestjs`) ใน container
- ใช้ `.dockerignore` เพื่อไม่ copy ไฟล์ที่ไม่จำเป็น
- ใช้ multi-stage build เพื่อลดขนาด image
- Health check เพื่อตรวจสอบสถานะ container

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [NestJS Deployment](https://docs.nestjs.com/recipes/deployment)

