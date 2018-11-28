var passport = require('passport');
var GoogleTokenStrategy = require('passport-google-token').Strategy;
const User = require('mongoose').model('User');

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleTokenStrategy({
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
  },
  function(accessToken, refreshToken, profile, done) {
      console.log("THIS IS THE GOOGLE PROFILE")
      console.log(profile)
       User.findOrCreate({ googleProvider: {id: profile.id, accessToken, refreshToken}, displayName: profile.displayName }, function (err, user) {
         return done(err, user);
       });
  }
));