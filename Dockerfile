FROM node:10.16.0

WORKDIR /app

COPY ./package.json .

CMD npm install -g yarn

RUN yarn

COPY . .

EXPOSE 8000

CMD yarn start