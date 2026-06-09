# Base image
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm ci

# Generate prisma client
RUN npx prisma generate

# Bundle app source
COPY . .

# Creates a "dist" folder with the compiled code
RUN npm run build

# ---

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Install production dependencies and generate Prisma client
RUN npm ci --omit=dev && npx prisma generate

EXPOSE 3000

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]
