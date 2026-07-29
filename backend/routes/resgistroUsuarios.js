const express = require("express");
const router = express.Router();

const {registrarUsuario} = require("../controllers/resgistroUsuarioController");

router.post("/", registrarUsuario);

module.exports = router ;