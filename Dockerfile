FROM node:26-alpine3.23

# Install curl for container health checks in ECS
# RUN apk add --no-cache curl

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npm", "start" ]