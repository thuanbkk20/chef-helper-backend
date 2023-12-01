FROM node:18.17 as build

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
CMD npm run start