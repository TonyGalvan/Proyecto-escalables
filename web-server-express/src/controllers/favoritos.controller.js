const { response, request } = require("express");
const Favorito = require("../models/favorito.model");

const getFavoritos = async (req = request, res = response) => {
    const { userId } = req.params;
    try {
        const favoritos = await Favorito.find({ userId });
        res.status(200).json(favoritos);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const agregarFavorito = async (req = request, res = response) => {
    const { userId, username, nombre, imagen, precio } = req.body;

    if (!userId || !username || !nombre || !imagen || !precio) {
        return res.status(400).json({ msg: "Datos incompletos" });
    }

    try {
        // Evitar duplicados
        const existe = await Favorito.findOne({ userId, nombre });
        if (existe) {
            return res.status(400).json({ msg: "Producto ya en favoritos" });
        }

        const favorito = new Favorito({ userId, username, nombre, imagen, precio });
        await favorito.save();
        res.status(200).json({ msg: "Agregado a favoritos" });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const eliminarFavorito = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const result = await Favorito.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            res.status(200).json({ msg: "Favorito eliminado" });
        } else {
            res.status(404).json({ msg: "Favorito no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

module.exports = { getFavoritos, agregarFavorito, eliminarFavorito };