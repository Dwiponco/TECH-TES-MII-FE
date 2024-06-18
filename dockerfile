FROM node:19-alpine

WORKDIR /app

COPY package* .
RUN npm install npm@latest

COPY . .

RUN npm run build

EXPOSE 3004

CMD ["npm", "run","preview"]