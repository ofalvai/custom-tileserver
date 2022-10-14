FROM node:16-bullseye

COPY . /data
WORKDIR /data

RUN npm install -g tileserver-gl-light

EXPOSE 8080

CMD ["tileserver-gl-light"]