FROM node:11.7-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN npm install yarn -g
RUN yarn install

COPY . .

EXPOSE 4000

CMD ["node", "./dist/starter.js"]

