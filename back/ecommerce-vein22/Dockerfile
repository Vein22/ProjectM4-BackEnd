FROM node:18.12

WORKDIR /app 

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

EXPOSE 3000

CMD ["npm", "run", "start"]