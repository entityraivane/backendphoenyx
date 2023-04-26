const { Router } = require("express");
const { crearUsuario } = require("../controllers/usuario");
const router = Router()
router.post('/', [], crearUsuario)
module.exports = router