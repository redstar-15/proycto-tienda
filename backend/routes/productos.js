const express = require("express");
const { obtenerProductos, actualizarProducto, agregarProducto ,eliminarProducto } = require("../controllers/productosController");
const {obtenerProductoId} = require("../controllers/productosController")
const router = express.Router();
const { verificarToken, verificarAdmin } = require("../middleware/auth");

router.get("/", obtenerProductos);
router.post("/",verificarToken, verificarAdmin, agregarProducto);
router.put("/:id",verificarToken, verificarAdmin, actualizarProducto);
router.get("/:id",verificarToken, verificarAdmin, obtenerProductoId);
router.delete("/:id",verificarToken, verificarAdmin, eliminarProducto);

module.exports = router;