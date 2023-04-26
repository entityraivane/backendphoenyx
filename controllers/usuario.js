const { request, response } = require("express")
const Usuario = require("../models/Usuario")

const crearUsuario = async (req = request, res = response) => {
    const { ...newBody } = req.body
    const usuariodb = new Usuario(newBody)
    console.log(usuariodb)
   // await usuariodb.save()
    return res.json({
        ok: true,
        msg: `crear usuario`
    })

}
module.exports = {
    crearUsuario
}