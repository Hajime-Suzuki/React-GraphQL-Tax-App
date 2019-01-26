#stage1
FROM node:11.7-alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN apk add yarn

COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

#stage2
FROM node:11.7-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 4000
CMD ["node", "./dist/starter.js"]

