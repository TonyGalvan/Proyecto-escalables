const { response, request } = require("express");
const Producto = require("../models/productos.model");
const { mongoose } = require("mongoose");


const getProductos = async (req = request, res = response) => {

    const { q } = req.query;

    

     try {
        const productos = await Producto.find();
        res.status(200).json(productos);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }    


};

const getProductoById = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                msg: "Producto no encontrado"
            });
        }

        const producto = await Producto.findOne({ _id: id });
        if (!producto) {
            return res.status(404).json({
                msg: "Producto no encontrado"
            });
        }

        res.status(200).json(producto);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }


};

const createProducto = async (req = request, res = response) => {

    const { nombre, imagen, descripcion, precio } = req.body;

    if (!nombre || !imagen || !descripcion || !precio) {
        res.status(400).json({
            msg: "Datos incompletos"
        })
        return;
    }

    try {
        const nuevoProducto = new Producto({
            nombre,
            imagen,
            descripcion,
            precio
        })

        await nuevoProducto.save();
        res.status(200).json({
            msg: "Producto creado con éxito",
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
};

const updateProducto = async (req = request, res = response) => {
    const { id } = req.params;
    const { nombre, imagen, descripcion, precio } = req.body;

    if (!nombre || !imagen || !descripcion || !precio) {
        res.status(400).json({
            msg: "Datos incompletos"
        })
        return;
    }

    if (!mongoose.isValidObjectId(id)) {
        return res.status(404).json({
            msg: "Producto no encontrado"
        });
    }

    res.status(200).json({
        msg: "Producto actualizado con éxito",
    })
    
};

const deleteProducto = async (req = request, res = response) => {

    const { id } = req.params;


    try {

        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({
                msg: "Producto no encontrado"
            });
        }

        const result = await Producto.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            res.status(200).json({
                msg: "Producto eliminado con éxito"
            });
        } else {
            res.status(404).json({
                msg: "Producto no encontrado"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            msg: "Error en el servidor"
        });
    }
}

module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
};