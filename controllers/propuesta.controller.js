const Propuesta = require('../models/propuesta');
const Usuario = require('../models/usuario');

const propuestaController = {};

propuestaController.getPropuestas = async (req,res) => {
    const propuestas = await Propuesta.find().populate('usuario');
    res.json(propuestas);
};

propuestaController.createPropuesta = async (req,res) => { 
    const propuesta = new Propuesta(req.body);
    await propuesta.save();
    await Usuario.findOneAndUpdate({_id: req.body.usuario }, { $push: { propuestas: propuesta._id }});
    res.json({status: 'propuesta guardada y asignada', _id: propuesta._id });
};

propuestaController.getPropuesta = async (req,res) => {
    const propuesta = await Propuesta.findById(req.params.id);
    res.json(propuesta);
};

propuestaController.editPropuesta = async (req,res) => {
    await Propuesta.findOneAndUpdate({_id:req.params.id}, req.body);
    res.json({status: 'propuesta actualizada', _id: propuesta._id });
};

propuestaController.deletePropuesta = async (req,res) => {
    await Propuesta.findByIdAndRemove(req.params.id);
    await Usuario.updateMany({ propuestas: { $in: [req.params.id]}}, { $pull: { propuestas: req.params.id }});
    await Usuario.updateMany({ propuestasVotadas: { $in: [req.params.id]}}, { $pull: { propuestasVotadas: req.params.id }});
    res.json({status: 'propuesta eliminada', _id: req.params.id });
};

propuestaController.getPropuestasUsuario = async (req,res) => {
    const propuestas = await Propuesta.find().where({ usuario: req.params.usuario })
    res.json(propuestas);
};

propuestaController.votarPropuesta = async (req,res) => {
    await Propuesta.findOneAndUpdate({_id: req.body.propuesta}, { $push: { votos: req.body.usuario }});
    await Usuario.findOneAndUpdate({_id: req.body.usuario}, { $push: { propuestasVotadas: req.body.propuesta }});
    res.json({status: 'propuesta votada' });
};


propuestaController.subirImagenes = async (req,res) => {
    Array.from(req.files.imagen).forEach( async imagen => {
        await imagen.mv(`./storage/dinamico/imgs/${imagen.name}`);
    });
    res.json({status: 'imagen/es subida/s' });
}

/*
propuestaController.subirImagenes = async (req,res) => {
 
    console.log(req.files);


    //datos = JSON.parse(req.body.datos);

    //console.log(datos.propuesta);
    //console.log(datos.imagenes);
    var i=0;
    for(file in req.files) {
        const imagen = req.files[file];
        await imagen.mv(`./storage/imgs/${imagen.name}`);
        console.log(datos.propuesta);
        console.log(datos.imagenes[i]);
        await Propuesta.findOneAndUpdate({_id: datos.propuesta}, { $push: { imagenes: datos.imagenes[i] }});
        i++;
    }

    res.json({status: 'imagen subida' });
}*/

module.exports = propuestaController;