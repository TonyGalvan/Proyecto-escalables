const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({
        msg: "Bienvenido a la página de inicio"
    });
});





module.exports = router;