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
RUN mkdir -p /etc/nginx/templates
RUN cat <<'EOF' > /etc/nginx/templates/default.conf.template
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
        set $backend_upstream "${BACKEND}";
        proxy_pass $backend_upstream$request_uri;

        # Required for HTTPS upstream (SNI)
        proxy_ssl_server_name on;
        proxy_ssl_protocols TLSv1.2 TLSv1.3;

        # Forward the backend hostname, not the frontend's
        proxy_set_header Host              ${BACKEND_HOST};
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

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

# At startup: resolve BACKEND_URL, extract hostname, envsubst only our vars, start nginx
CMD ["sh", "-c", "\
  export BACKEND=${BACKEND_URL:-http://localhost:3000} && \
  export BACKEND_HOST=$(echo \"$BACKEND\" | sed -E 's|https?://([^/:]+).*|\\1|') && \
  envsubst '${BACKEND} ${BACKEND_HOST}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && \
  nginx -g 'daemon off;'"]
