const { Router } = require("express");
const { getProductos, createProducto, updateProducto, deleteProducto, getProductoById } = require("../controllers/productos.controller");
const { verifyJWT } = require("../middlewares/verifyJWT");
const { verifyAdminRole } = require("../middlewares/verifyAdminRole");
const router = Router();


router.get("/", getProductos);

router.get("/:id", [verifyJWT, verifyAdminRole], getProductoById);

router.post("/", [verifyJWT, verifyAdminRole], createProducto);

router.put("/:id", [verifyJWT, verifyAdminRole], updateProducto);

router.delete("/:id", [verifyJWT, verifyAdminRole], deleteProducto);

module.exports = router;