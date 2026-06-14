# Base image for building the app
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Set API URL to relative path so it hits Nginx proxy
ENV VITE_API_URL=/api

# Copy source code and build
COPY . .
RUN npm run build

# ---

# Production image for serving static files
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Add custom nginx configuration template for envsubst
RUN cat <<'EOF' > /etc/nginx/conf.d/default.conf
server {
    listen 80;

    gzip on;
    gzip_types text/plain text/css application/javascript application/json;
    gzip_min_length 1024;
    gzip_comp_level 6;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    location /api/ {
        proxy_pass REPLACE_BACKEND_URL;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

EXPOSE 80

CMD ["sh", "-c", "BACKEND=${BACKEND_URL:-http://localhost:3000} && sed -i 's|REPLACE_BACKEND_URL|'\"${BACKEND}\"'|g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
