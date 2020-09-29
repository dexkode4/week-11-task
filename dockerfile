FROM node:12

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

RUN yarn tsc

ENV PORT=3000

EXPOSE 3000

CMD [ "yarn","start" ]

