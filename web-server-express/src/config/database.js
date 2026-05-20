const mongoose = require('mongoose');

const connectDB = () => {

    const connstring = process.env.MONGO_STRING //cadena de conexion para conectar a la base de datos en mongodb
    const dbName = process.env.DB_NAME //nombre de la base de datos


    mongoose.connect(connstring, {
        dbName: dbName,
    }).then(() => {
        console.log("Conexión exitosa a la base de datos");
    }).catch((error) => {
        console.log("Error de conexión a la base de datos:");
        console.log(error);
    })
}

module.exports = connectDB;