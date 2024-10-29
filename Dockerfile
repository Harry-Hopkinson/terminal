FROM node:22-alpine as base

WORKDIR /home/node/app
COPY package.json ./
RUN npm install -g npm-check-updates
RUN ncu -u
RUN yarn install
COPY . ./

FROM base as production

ENV NODE_PATH=./build
RUN yarn build
