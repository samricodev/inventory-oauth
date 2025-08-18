FROM node:alpine3.20

RUN mkdir -p /inventory-oauth
WORKDIR /inventory-oauth

COPY package*.json ./
RUN npm install

COPY ./src/index.js .

EXPOSE 3081

CMD [ "npm", "run", "start.dev" ]