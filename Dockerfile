FROM node:10.16.0

WORKDIR /app

COPY ./package.json .

CMD npm install -g yarn

CMD npm install -g ts-node

RUN yarn

COPY . .

EXPOSE 8000

CMD yarn prod