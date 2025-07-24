# Dockerfile for React (Vite) App
ARG VERSION
# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Production stage
FROM nginx:alpine
ARG VERSION
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
LABEL org.opencontainers.image.version=$VERSION
ENV VERSION=$VERSION
EXPOSE 80
CMD ["/docker-entrypoint.sh"]
