const express = require("express");
const router = express.Router();
const {obtenerCategoriaId, agregarCategoria, actualizarCategoria, eliminarCategoria , obtenerCategoria} = require("../controllers/categoriasController");
const { verificarToken, verificarAdmin } = require("../middleware/auth");

router.get("/", obtenerCategoria);
router.get("/:id", obtenerCategoriaId);
router.post("/",verificarToken, verificarAdmin, agregarCategoria);
router.put("/:id",verificarToken, verificarAdmin, actualizarCategoria);
router.delete("/:id",verificarToken, verificarAdmin, eliminarCategoria);

module.exports = router;