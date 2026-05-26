const mongoose = require("mongoose");

const favoritoSchema = mongoose.Schema({
    userId: String,
    username: String,
    nombre: String,
    imagen: String,
    precio: Number,
});

module.exports = mongoose.model("Favorito", favoritoSchema);