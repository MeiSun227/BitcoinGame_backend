FROM --platform=linux/amd64 node:16

WORKDIR /usr/src/app

COPY . .

EXPOSE 3001

CMD ["npm", "start"]    