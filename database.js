const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true); 

const URI = 'mongodb://localhost/MiAplicacion';

const REMOTE_URI='mongodb+srv://Adriel:Adriel@cluster0-ozqtr.mongodb.net/test?retryWrites=true&w=majority'


mongoose.connect(REMOTE_URI)
    .then(db => console.log(`Conectado a base de datos ${db.connection.db.databaseName}`))
    .catch(err => console.log(err));

module.exports = mongoose;