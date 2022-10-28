FROM node:19-alpine

VOLUME /data

WORKDIR /app

RUN npm install -g tileserver-gl-light@4.1.1

EXPOSE 8080
CMD tileserver-gl-light --config /data/config.json