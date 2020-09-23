const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
  UsernameField: 'email',
}, async (email, password, done) => {
  const user = await User.findOne({email: email});
  if(!user){
    return done(null, false, {message: 'User not found'});
  } else {
    const match = await user.matchPassowrd(password)
    if(match){
      return done(null, user);
    } else {
      return done(null, false, {message: 'Incorrect password'});
    }
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
});
