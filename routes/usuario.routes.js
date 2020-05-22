const express = require('express');
const routerUsuario = express.Router();

const usuario = require('../controllers/usuario.controller');



routerUsuario.get('/',usuario.getUsuarios);
routerUsuario.post('/',usuario.createUsuario);
routerUsuario.get('/:id',usuario.getUsuario);
routerUsuario.put('/:id',usuario.editUsuario);
routerUsuario.delete('/:id',usuario.deleteUsuario);

module.exports = routerUsuario;