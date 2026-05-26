const { Router } = require("express");
const { getPedidos, crearPedido } = require("../controllers/pedidos.controller");
const { verifyJWT } = require("../middlewares/verifyJWT");

const router = Router();

router.get("/:userId", verifyJWT, getPedidos);
router.post("/", verifyJWT, crearPedido);

module.exports = router;