FROM node:20-alpine

# install CA roots once during build
RUN apk add --no-cache ca-certificates && update-ca-certificates

WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY . .

EXPOSE 3000
CMD ["npm","start"]
