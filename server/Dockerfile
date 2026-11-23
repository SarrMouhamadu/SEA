FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000

# Utilisation du serveur unifié avec gestion des routes et persistance
CMD ["node", "src/server.js"]
