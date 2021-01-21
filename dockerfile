
FROM node:current-slim

WORKDIR /usr/src/server

COPY package.json .

RUN npm install --only=prod

EXPOSE 3001

RUN npm install pm2 -g

CMD ["pm2-runtime", "src/index.js"]


COPY . .
