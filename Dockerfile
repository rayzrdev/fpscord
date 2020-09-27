FROM node:12-alpine as runtime
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm ci --only=prod

COPY src ./src

CMD [ "npm", "start" ]

