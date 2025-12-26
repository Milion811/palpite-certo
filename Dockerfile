FROM node:20-slim
WORKDIR /usr/src/app

# install dependencies
COPY package*.json ./
RUN npm ci --only=production

# copy source
COPY . .

ENV PORT 4000
EXPOSE 4000

CMD ["npm", "start"]
