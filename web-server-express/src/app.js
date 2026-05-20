require('dotenv').config(); //cargar las variables de entorno desde el archivo .env
const Server = require("./config/server");

const server = new Server();
server.listen();






