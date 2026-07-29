const express = require("express");
const router = express.Router();

const {

    obtenerCarrito,

    agregarProductos,

    actualizarCantidad,

    eliminarProducto,

    finalizarCompra
    

} = require("../controllers/carritoController");

const { verificarToken } = require("../middleware/auth");

router.get("/",verificarToken, obtenerCarrito);

router.post("/",verificarToken, agregarProductos);

router.put("/:id",verificarToken, actualizarCantidad);

router.delete("/:id",verificarToken, eliminarProducto);

router.put("/finalizar/:id",verificarToken, finalizarCompra);

module.exports = router;
