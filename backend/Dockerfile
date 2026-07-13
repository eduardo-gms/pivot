# Base image
FROM node:20-alpine AS builder

RUN apk add --no-cache openssl
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci

RUN npx prisma generate

COPY . .
RUN npm run build

# Compila seed.ts → seed.js (CJS) para rodar em prod sem ts-node
RUN node node_modules/typescript/bin/tsc \
    --module commonjs \
    --target ES2023 \
    --esModuleInterop true \
    --moduleResolution node \
    --skipLibCheck true \
    --rootDir ./prisma \
    --outDir ./prisma \
    prisma/seed.ts

# ---

FROM node:20-alpine

ENV NODE_ENV=production

RUN apk add --no-cache openssl
WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
# Inclui o seed.js compilado no builder
COPY --from=builder /app/prisma ./prisma

RUN npm ci --omit=dev && npx prisma generate

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/api/health || exit 1

# Inicia a aplicacao diretamente
CMD ["npm", "run", "start:prod"]