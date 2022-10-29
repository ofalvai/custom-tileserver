FROM node:19-alpine

USER node

VOLUME /data

WORKDIR /app

RUN npm install --omit=optional tileserver-gl-light@4.1.1

EXPOSE 8080
CMD ["node", "node_modules/.bin/tileserver-gl-light", "--config", "/data/config.json"]