const { response, request } = require("express");
const Pedido = require("../models/pedido.model");

const getPedidos = async (req = request, res = response) => {
    const { userId } = req.params;
    try {
        const pedidos = await Pedido.find({ userId });
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

const crearPedido = async (req = request, res = response) => {
    const { userId, username, folio, totalProductos, productos, total } = req.body;

    if (!userId || !username || !folio || !productos || !total) {
        return res.status(400).json({ msg: "Datos incompletos" });
    }

    try {
        const pedido = new Pedido({
            userId, username, folio,
            totalProductos, productos, total
        });
        await pedido.save();
        res.status(200).json({ msg: "Pedido guardado con éxito" });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

module.exports = { getPedidos, crearPedido };