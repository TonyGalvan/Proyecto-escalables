const mongoose = require("mongoose");

const pedidoSchema = mongoose.Schema({
    userId: String,
    username: String,
    folio: Number,
    totalProductos: Number,
    productos: [
        {
            nombre: String,
            imagen: String,
            precio: Number,
            cantidad: Number,
        }
    ],
    total: Number,
}, { timestamps: true });

module.exports = mongoose.model("Pedido", pedidoSchema);