FROM node:12-alpine

WORKDIR /srv
COPY . .

RUN yarn build

ENV NODE_ENV production

EXPOSE 8080

CMD yarn serve
