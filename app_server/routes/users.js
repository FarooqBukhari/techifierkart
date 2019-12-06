var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport');
var Order = require('../models/order');
var Cart = require('../models/cart');
router.use(csrfProtection);

/* GET profile page. */
router.get('/profile',isLoggedin,function(req, res, next) {
  Order.find({user: req.user},function(err, orders){
    if(err){
      return res.write('Error!');
    }
    var cart;
    orders.forEach(function(order){
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
    if(req.user.adminPriviliges == true){
      res.redirect('/admin/panel');
    }
    else{
      res.render('user/profile',{currentUser:req.user, orders: orders});
    }
  });
  
  
});

router.get('/logout',isLoggedin, function(req, res, next){
  req.logout();
  res.redirect('/');
});

router.use('/',notLoggedin,function(req,res,next){
  next();
});

/* GET signup page. */
router.get('/signup',function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', {csrfToken: req.csrfToken() , messages: messages , hasErrors: messages.length > 0});
});

/* POST User Sign up to Profile Page*/
router.post('/signup', passport.authenticate('local.signup', {
  failureRedirect: '/user/signup',
  failureFlash: true
}),function(req,res,next){
  if(req.session.oldUrl){
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  }
  else{
    res.redirect('/user/profile');
  }
});
/* GET signin page. */
router.get('/signin',function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', {csrfToken: req.csrfToken() , messages: messages , hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
  failureRedirect: '/user/signin',
  failureFlash: true
}),function(req,res,next){
      if(req.session.oldUrl){
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
      }
      else{
        res.redirect('/user/profile');
      }
});

module.exports = router;

function isLoggedin(req, res , next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
function notLoggedin(req, res , next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
