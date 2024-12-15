FROM node:14
WORKDIR /C:/flight_project/service-admin
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4001
CMD ["node", "service-admin.js"]