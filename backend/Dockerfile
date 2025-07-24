FROM node:20-alpine
ARG VERSION

# install CA roots once during build
RUN apk add --no-cache ca-certificates && update-ca-certificates

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY . .

LABEL org.opencontainers.image.version=$VERSION
ENV VERSION=$VERSION

EXPOSE 3000
CMD ["npm","start"]
