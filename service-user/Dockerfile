FROM node:14
WORKDIR /C:/flight_project/service-user
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4002
CMD ["node", "service-user.js"]