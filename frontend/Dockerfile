FROM node:19 as builder

USER node

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY src src
COPY .env .env
RUN npm run build

FROM busybox:1.36

COPY --from=builder /app/dist .

CMD ["busybox", "httpd", "-f", "-v", "-p", "3000"]