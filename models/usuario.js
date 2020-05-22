const mongoose = require('mongoose');
const { Schema } = mongoose; // Del módulo mongoose, sólo se utilizan los schemas

const UsuarioSchema = new Schema({

    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    propuestas: [{type: Schema.ObjectId, ref: 'Propuesta', required: false}],
    propuestasVotadas: [{type: Schema.ObjectId, ref: 'Propuesta', required: false}]
});

module.exports = mongoose.model('Usuario',UsuarioSchema);