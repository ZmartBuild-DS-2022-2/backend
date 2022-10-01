FROM node:current-alpine

RUN mkdir /api
WORKDIR /api

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install

CMD ["npm", "start"]
EXPOSE 3000