const { request, response } = require("express");
const Usuario = require("../classes/Usuario");
const bcryptjs = require("bcryptjs");
const crearUsuario = async (req = request, res = response) => {
  const { estado, rol, permisos, creacion, editado, password, ...newBody } =
    req.body;
  newBody.estado = `activo`;
  newBody.rol = `INV_ROL`;
  newBody.creacion = Date.now();
  newBody.editado = Date.now();
  newBody.permisos = ["ninguno"];
  const salt = bcryptjs.genSaltSync();
  pwsecrp = bcryptjs.hashSync(password, salt);
  newBody.password = pwsecrp;
  const usuariodb = new Usuario(newBody);

  await usuariodb.save();
  return res.json({
    ok: true,
    msg: `crear usuario`,
    resultado: usuariodb,
  });
  //TODO: HACER EL LOGIN Y CREAR EL SOCKET PARA ESTOS
};

module.exports = {
  crearUsuario,
};
