const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const path = require('path');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.homePath = "/api/proyecto";
        this.usersPath = "/api/users";
        this.productosPath = "/api/productos";
        this.authPath = "/api/auth";

        this.app.use(express.json());
        this.app.use(cors());

        this.middlewares();
        this.routes();
        connectDB();

    }

    routes() {

        //middlewares
        this.app.use(this.homePath, require("../routes/home.routes"));
        this.app.use(this.usersPath, require("../routes/users.routes"));
        this.app.use(this.productosPath, require("../routes/productos.routes"));
        this.app.use(this.authPath, require("../routes/auth.routes"));

        this.app.use(
            '/uploads',
            express.static(path.join(__dirname, '../uploads'))
        );

        this.app.get('/', (req, res) => {
            res.json({
                msg: "Hola mundo"
            });
        })
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}


module.exports = Server;