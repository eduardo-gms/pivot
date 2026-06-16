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
        # DNS resolver (Google + Cloudflare) for runtime resolution
        resolver 8.8.8.8 1.1.1.1 valid=30s ipv6=off;
        resolver_timeout 10s;

        # Use variable to force runtime DNS resolution
        set $backend_upstream "REPLACE_BACKEND_URL";
        proxy_pass $backend_upstream;

        # Required for HTTPS upstream (SNI)
        proxy_ssl_server_name on;
        proxy_ssl_protocols TLSv1.2 TLSv1.3;

        # Forward the backend hostname, not the frontend's
        proxy_set_header Host              REPLACE_BACKEND_HOST;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Longer timeouts for scale-to-zero cold starts
        proxy_connect_timeout 60s;
        proxy_read_timeout    60s;
        proxy_send_timeout    60s;
    }
}
EOF

EXPOSE 80

# At startup: inject BACKEND_URL into nginx config, extract hostname for Host header
CMD ["sh", "-c", "\
  BACKEND=${BACKEND_URL:-http://localhost:3000} && \
  BACKEND_HOST=$(echo \"$BACKEND\" | sed -E 's|https?://([^/:]+).*|\\1|') && \
  sed -i \"s|REPLACE_BACKEND_URL|${BACKEND}|g\" /etc/nginx/conf.d/default.conf && \
  sed -i \"s|REPLACE_BACKEND_HOST|${BACKEND_HOST}|g\" /etc/nginx/conf.d/default.conf && \
  nginx -g 'daemon off;'"]
