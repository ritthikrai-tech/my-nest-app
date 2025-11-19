# Stage 1: Build
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json ./
COPY bun.lockb* ./

# Install dependencies (use --frozen-lockfile only if lockfile exists)
RUN if [ -f bun.lockb ]; then bun install --frozen-lockfile; else bun install; fi

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Stage 2: Production
FROM oven/bun:1-alpine AS production

WORKDIR /app

# Copy package files
COPY package.json ./
COPY bun.lockb* ./

# Install only production dependencies (use --frozen-lockfile only if lockfile exists)
RUN if [ -f bun.lockb ]; then bun install --frozen-lockfile --production; else bun install --production; fi

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Change ownership
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["bun", "run", "dist/main"]

