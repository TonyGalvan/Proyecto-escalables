const { Router } = require("express");
const { getFavoritos, agregarFavorito, eliminarFavorito } = require("../controllers/favoritos.controller");
const { verifyJWT } = require("../middlewares/verifyJWT");

const router = Router();

router.get("/:userId", verifyJWT, getFavoritos);
router.post("/", verifyJWT, agregarFavorito);
router.delete("/:id", verifyJWT, eliminarFavorito);

module.exports = router;