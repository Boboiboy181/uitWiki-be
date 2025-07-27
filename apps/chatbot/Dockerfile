FROM node:alpine AS development

RUN corepack enable

WORKDIR /usr/src/app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn

RUN yarn install

CMD ["yarn", "start:dev", "chatbot"]

FROM node:alpine AS production

RUN corepack enable

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/chatbot/main"]