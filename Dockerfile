FROM node:slim

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

ENV NODE_ENV=production
ENV PORT 3001

EXPOSE 3001

USER node

CMD [ "npm", "start" ]