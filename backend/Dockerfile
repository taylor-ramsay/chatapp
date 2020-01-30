FROM node:10

WORKDIR /app

COPY . .

EXPOSE 8080

RUN npm install -g nodemon

CMD [ "nodemon", "server.js" ]

#Refence: https://dev.to/jay97/docker-compose-an-express-and-mongo-app-aai