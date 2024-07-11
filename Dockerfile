# Usar una imagen base de Node.js
FROM node:20

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de la aplicación al directorio de trabajo
COPY . .

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 2024

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
