const { Router } = require("express");
const { crearUsuario } = require("../controllers/usuario");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router()
router.post('/', [

    validarJWT,
    validarCampos
], crearUsuario)
module.exports = router