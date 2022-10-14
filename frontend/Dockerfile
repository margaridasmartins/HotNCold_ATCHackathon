# nginx state for serving content
FROM nginx:alpine

#copy defaults
COPY templates/default.conf.templates /etc/nginx/conf.d/default.conf

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY build .