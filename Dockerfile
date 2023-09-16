FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install --production

CMD ["node", "dist/index.js"]

EXPOSE 8080
