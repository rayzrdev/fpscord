FROM node:12-alpine as runtime
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY src ./src
COPY tsconfig.json .
RUN npm run build

CMD [ "npm", "start" ]

