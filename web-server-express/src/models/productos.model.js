const mongoose = require("mongoose");

//Schema para productos
const productoSchema = new mongoose.Schema({
    nombre: String,
    imagen: String,
    descripcion: String,
    precio: Number,
})

module.exports = mongoose.model("Producto", productoSchema);