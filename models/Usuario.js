const { Schema, model } = require("mongoose");
const UsuarioSchema = Schema({
    correo: {
        type: String,
        required: true,
        unique:true
    },

    telefono: {
        type: String,
        default: '0000'
    },
    img:{
        type:String,
        default:'',

    },
    rol: {
        type: String,
        required: true
    },
    permisos: {
        type: [],
        required: true
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creacion: {
        type: Date,
        default: Date.now()
    },
    editado: {
        type: Date,
        default: Date.now()
    }
});

UsuarioSchema.method("toJSON", function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
module.exports = model("Usuario", UsuarioSchema);