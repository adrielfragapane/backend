const mongoose = require('../database');
const Schema = mongoose.Schema;

//const findOrCreate = require('mongoose-findorcreate');

const UserSchema = new Schema({
    //method: { type: String, enum: ['facebook'], required: true },

    facebookId: {type: String},
    name: {type: String},
    displayName: {type: String},
    email: {type: String},
    photoURL: {type: String},
    token: {type: String},
    select: false}
);

//UserSchema.plugin(findOrCreate);

/*
UserSchema.statics.findOrCreate = function findOrCreate(profile, cb){
    var userObj = new this();
    this.findOne({facebookId : profile.facebookId},function(err,user){ 
        if(!user){
            userObj.facebookId = profile.facebookId;
            userObj.name = profile.diplayName;
            userObj.save(cb);
        }else{
            cb(err,user);
        }
    });
};
*/

/*
UserSchema.statics.findOrCreate = async function (profile) {

    await this.findOne({facebookId: profile.id }, async (err,user) => {
        if(err) {
          console.log(err); 
          done(err,null);
        }
        else {
          console.log(profile);
          console.log(user);
          if(!user) {
            const newUser = new UserSchema();
            newUser.facebookId = profile.id;
            newUser.name = profile.displayName;
            await newUser.save()
            .then( user => console.log(user))
            .catch( err => console.log(err));
          }
          done(null,user);
        }
      });
}
*/


module.exports = mongoose.model('User', UserSchema);