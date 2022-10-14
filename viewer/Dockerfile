FROM node:16-bullseye as builder

VOLUME /data
WORKDIR /data

COPY . .

RUN npm install
RUN npm run build

FROM busybox:1.35

COPY --from=builder /data/dist .

CMD ["busybox", "httpd", "-f", "-v", "-p", "3000"]