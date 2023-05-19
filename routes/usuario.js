const { Router } = require("express");
const { crearUsuario } = require("../controllers/usuario");
const { existeModelo } = require("../helpers/validar-modelo");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const Usuario = require("../classes/Usuario");
const router = Router();
router.get("/", [], (req, res) => {
  res.json({
    ok: true,
    msg: "Hola",
  });
});
router.post(
  "/",
  [
    check("nombre", "el nombre es obligatorio").notEmpty(),
    check("correo", "el correo es obligatorio").notEmpty(),
    check("correo").custom((correo) => existeModelo(correo, "correo", Usuario)),
    check("password", "el passwrod es obligatorio").notEmpty(),
    validarCampos,
  ],
  crearUsuario
);
module.exports = router;
