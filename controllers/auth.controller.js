const UsuarioAuth = require('../models/usuarioAuh');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authController = {};

const SECRET_KEY = 'secretkey123456';

authController.singin = async (req,res,next) => {
    
    const nuevoUsuario = new UsuarioAuth({
        nombre: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    });

    await nuevoUsuario.save( (err,usuario) => {
 
        if(err && err.code == 11000) {
            return res.json({status: 409, message: 'Este email ya se encuentra registrado'});
        } 
        if(err) {
            return res.json({status: 500, message: 'Error en el servidor'});
        }
        const expiresIn = 24*60*60;
        const accessToken = jwt.sign({id: usuario._id}, SECRET_KEY, {expiresIn: expiresIn});
        const datosUsuario = {
            nombre: nuevoUsuario.nombre,
            email: nuevoUsuario.email,
            accessToken: accessToken,
            expiresIn: expiresIn
        }
        return res.send({datosUsuario});
    });
}

authController.perfil = async (req,res) => {

    const token = req.headers['x-access-token'];
    
    if(!token) {
        return res.json({status: 401, message: 'Token no ingresado'});
    }
    
    jwt.verify(token, SECRET_KEY, async (err,decodificado) => {
        if(err) {
            return res.status(401).json({status: err.message});    
        }
        else {
            const usuario = await UsuarioAuth.findOne({_id: decodificado.id});
            if(!usuario) {
                return res.json({status: 404, message : 'Usuario no encontrado'});
            }
            res.json(usuario);
        }
    });
}

authController.login = async (req,res) => {

    const usuario = await UsuarioAuth.findOne({email: req.body.email});

    if(!usuario) {
        return res.json({status: 404, message: 'El email no está registrado'});
    } 
    else {
        const passordValido = bcrypt.compareSync(req.body.password, usuario.password);
        
        if (passordValido) {
            const expiresIn = 30;
            const accessToken = jwt.sign({id: usuario._id}, SECRET_KEY, {expiresIn: expiresIn});
            const informacionUsuario = {
                nombre: usuario.nombre,
                email: usuario.email,
                accessToken: accessToken,
                expiresIn: expiresIn
            }
            return res.json({informacionUsuario, status: 200, message: 'Usuario logueado correctamente'});
        }
        else {
            return res.json({ status: 409, message: 'Password incorrecto'});
        }
    }
}

authController.facebookOAuth = (req, res) => {
    if(!req.user) {
        return res.send(401, 'User not authenticated');
    }
    req.token = createToken(req.user);
    res.setHeader('x-auth-token', req.token);
    res.status(200).json({token: req.token, expiresIn: 30});
}

createToken = auth => {
    return jwt.sign({ id: auth.id }, SECRET_KEY, { expiresIn: 30 });
}

authController.checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        if(token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    console.log('no es valido');
                    return res.status(401).json({ success: false, message: 'Token is not valid' });
                } else {
                  req.decoded = decoded;
                  next();
                }
            });
        }
    }
    else {
        console.log('sin permiso');
        return res.status(401).json({  success: false,
          message: 'Auth token is not supplied'
        });
    }
}









/*

    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
        if (token) {




            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                  return res.status(401).json({ success: false, message: 'Token is not valid' });
                } else {
                  req.decoded = decoded;
                  next();
                }
              });



        }
        else {
            return res.json({  success: false,
              message: 'Auth token is not supplied'
            });
        }
    }
};*/

module.exports = authController;