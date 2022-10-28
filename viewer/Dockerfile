FROM node:19 as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY src src
RUN npm run build

FROM busybox:1.35

COPY --from=builder /app/dist .

CMD ["busybox", "httpd", "-f", "-v", "-p", "3000"]