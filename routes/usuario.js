const { Router } = require("express");
const { crearUsuario } = require("../controllers/usuario");
const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const { existeModelo } = require("../helpers/validar-modelo");
const Usuario = require("../models/Usuario");
const router = Router()
router.post('/', [
    check('nombre', 'el nombre es obligatorio').notEmpty(),
    check('correo', 'el correo es obligatorio').notEmpty(),
    check('correo').custom((correo) => existeModelo(correo, 'correo', Usuario)),
    check('password', 'el passwrod es obligatorio').notEmpty(),
    validarCampos
], crearUsuario)
module.exports = router