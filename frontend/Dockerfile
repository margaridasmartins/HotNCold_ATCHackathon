# nginx state for serving content
FROM nginx:alpine

#copy defaults
COPY templates /etc/nginx/templates/

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY build .