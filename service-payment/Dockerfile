FROM node:14
WORKDIR /C:/flight_project/service-payment
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4003
CMD ["node", "service-payment.js"]