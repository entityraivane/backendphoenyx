const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../classes/Usuario");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/verificargoogle");

const login = async (req = request, res = response) => {
  const { correo, password } = req.body;
  try {
    const usuariodb = await Usuario.findOne({ correo: correo });
    if (!usuariodb) {
      return res.status(404).json({
        ok: false,
        msg: `no existe el email ${correo} en la base de datos`,
      });
    }
    const validPassword = bcryptjs.compareSync(password, usuariodb.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "El password no es correcto",
      });
    }
    if (usuariodb.estado == "inactivo") {
      return res.status(409).json({
        ok: false,
        msg: `Usted no esta autorizado para acceder a este sitio`,
      });
    }

    const token = await generarJWT(usuariodb.id);
    return res.json({
      ok: true,
      msg: `te logueaste correctamente`,
      token,
      usuario: usuariodb,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: `Error hable con el administrador`,
    });
  }
};
const loginGoolge = async (req = request, res = response) => {
  const { photoURL, displayName, idToken } = req.body;
  const { correo } = await googleVerify(idToken);
  const usuariodb = await Usuario.findOne({ correo });
  if (!usuariodb) {
    data = {
      estado: `activo`,
      rol: `INV_ROL`,
      nombre: displayName,
      img: photoURL,
      password: "@@@",
      correo,
    };
    const usuario = new Usuario(data);

    await usuario.save();
    const tokenSistema = await generarJWT(usuario._id);
    return res.json({
      ok: true,
      msg: `se creo cuenta  con gmail correctamente`,
      tokenSistema,
    });
  } else {
    const tokenSistema = await generarJWT(usuariodb._id);
    console.log(tokenSistema);
    return res.json({
      ok: true,
      msg: `se leogeo  con gmail correctamente`,
      tokenSistema,
    });
  }
};
const renovarToken = async (req = request, res = response) => {
  const id = req.usuario._id;
  const usuario = req.usuario;
  console.log(id);
  console.log(usuario);
  const token = await generarJWT(id);
  res.json({
    ok: true,
    msg: "Estas en el renovar token",
    token,
    usuario,
  });
};
module.exports = {
  login,
  renovarToken,
  loginGoolge,
};
