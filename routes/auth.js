const { Router } = require("express");
const { login, renovarToken } = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router()

router.post('/login', [

    check('correo', 'el correo debe ser valido').isEmail(),
    check('correo', 'el correo es necesario').notEmpty(),
    check('password', 'el password es obligatorio').notEmpty(),
    validarCampos

], login)

router.get('/renovar', [
    validarJWT,
    validarCampos
], renovarToken)

module.exports = router