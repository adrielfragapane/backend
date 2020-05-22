const express = require('express');
const routerPropuesta = express.Router();

const propuesta = require('../controllers/propuesta.controller');


/* IMPORTANTE: Las rutas relativas deben ir al final porque si no las toma primero y no toma las siguientes */

//Agregar un voto a una propuesta

routerPropuesta.put('/votar',propuesta.votarPropuesta);
routerPropuesta.post('/upload',propuesta.subirImagenes);
//Operaciones básicas

routerPropuesta.get('/',propuesta.getPropuestas);
routerPropuesta.post('/',propuesta.createPropuesta);
routerPropuesta.get('/:id',propuesta.getPropuesta);
routerPropuesta.put('/:id',propuesta.editPropuesta);
routerPropuesta.delete('/:id',propuesta.deletePropuesta);


routerPropuesta.get('/usuario/:usuario',propuesta.getPropuestasUsuario);

module.exports = routerPropuesta;