FROM node:24.5-slim

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm","run","start"]