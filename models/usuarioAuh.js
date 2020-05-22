const mongoose = require('../database');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const usuarioAhtSchema = new Schema({
    email: {type: String, unique: true, lowercase: true, required: true},
    password: {type: String, required: true},
    nombre: {type: String, required: true}
},{
    timestamps: true
});

usuarioAhtSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    console.log(bcrypt.hashSync(password, salt));
    return bcrypt.hash(password, salt);
}

module.exports = mongoose.model('UsuarioAuth',usuarioAhtSchema);