const appConfig = require('../config')
const mongoose = require('mongoose');
const { Schema } = mongoose;

const PropuestaSchema = new Schema({

    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    usuario: {type: Schema.ObjectId, ref: 'Usuario'},
    votos: [{type: Schema.ObjectId, ref: 'Usuario'}], // TODO: COLOCAR UNIQUE
    imagenes: [{type: String, required: false}],
    ubicacion: {
        direccion: {type: String, required: false},
        latitud: {type: Number, required: false},
        longitud: {type: Number, required: false}
    }
});

module.exports =mongoose.model('Propuesta',PropuestaSchema);