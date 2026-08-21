FROM node:26-alpine3.23

RUN apk add --no-cache curl

WORKDIR /app

COPY package*.json ./

COPY server.js ./

RUN npm install

EXPOSE 8000

CMD [ "node", "server.js" ]