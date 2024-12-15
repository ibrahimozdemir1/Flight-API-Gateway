FROM node:14
WORKDIR /C:/flight_project/api-gateway
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "api-gateway.js"]