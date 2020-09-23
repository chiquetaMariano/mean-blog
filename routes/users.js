var express = require('express');
var router = express.Router();

const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signin', (req, res) => {
  res.render('users/signin');
});

router.get('/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/signup', async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  console.log(req.body);
  if(name.length <= 0){
    errors.push({text: 'Please, insert your name'});
  }
  if(password != confirm_password) {
    errors.push({text: 'Passwords do not match'}):
  }
  if(password.length < 4){
    errors.push({text: 'Password must be at least 4 characters'});
  }
  if(errors.length > 0){
    // res.render('/signup', {errors, name, email, password, confirm_password});
  } else {
    const emailUser = await User.findOne({email: email});
    if(emailUser){
      // show  error message
    }
    const newUser = new User({name, email, password});
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    res.send('ok');
  }
})

module.exports = router;
