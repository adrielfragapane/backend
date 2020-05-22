const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const facebookStrategy = require('passport-facebook').Strategy;
const facebookTokenStrategy = require('passport-facebook-token');

const User = require('./models/user');


module.exports = function () {
    passport.use('facebookToken', new facebookTokenStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET
        }, async (accessToken, refreshToken, profile, done) => {
            await User.findOne({facebookId: profile.id }, async (err,user) => {
                if(err) {
                    console.log(err); 
                    done(err,null);
                }
                else {
                    console.log(user);
                    if(!user) {
                        const newUser = new User();
                        newUser.facebookId = profile.id;
                        newUser.name = profile.displayName;
                        await newUser.save()
                        .then( user => console.log(user))
                        .catch( err => console.log(err));
                    }
                    done(null,user);
                }
            });
        })
    )
}







passport.use(new facebookTokenStrategy({
    clientID: '3534806666534396',
    clientSecret: '43d68a162af24c649dc3c13511fefbdb'
    },async (accessToken, refreshToken, profile, done) => {
      await User.findOne({facebookId: profile.id }, async (err,user) => {
        if(err) {
          console.log(err); 
          done(err,null);
        }
        else {
          console.log(user);
          if(!user) {
            const newUser = new User();
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
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});