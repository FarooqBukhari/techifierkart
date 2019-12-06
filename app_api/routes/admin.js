var express = require('express');
var router = express.Router();
var Order = require('../../app_server/models/order');
var Cart = require('../../app_server/models/cart');

var ctrlProductManagement = require('../controllers/productManagement');

/* GET admin Panel page. */
router.get('/panel',isLoggedin,function(req, res, next) {
  res.locals.adminLogin = true;
  Order.find({user: req.user},function(err, orders){
    if(err){
      return res.write('Error!');
    }
    var cart;
    orders.forEach(function(order){
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
    res.render('admin/panel',{currentUser: req.user, orders: orders});
  });
});

router.get('/logout',isLoggedin, function(req, res, next){
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        res.locals.adminLogin = false;
        return res.redirect('/');
      }
    });
  }
});

router.get('/addProduct',isLoggedin, ctrlProductManagement.addProductPage);
router.post('/addProduct', isLoggedin,ctrlProductManagement.addProduct);
router.get('/deleteProduct',isLoggedin, ctrlProductManagement.deleteProductPage);
router.get('/deleteProduct/:productId',isLoggedin, ctrlProductManagement.deleteProduct);
router.get('/updateProduct',isLoggedin, ctrlProductManagement.updateProductPage);
router.get('/updateProduct/:productId',isLoggedin, ctrlProductManagement.updateProductAttrs);
router.post('/updateProduct/:productId',isLoggedin, ctrlProductManagement.updateProduct);



router.use('/',notLoggedin,function(req,res,next){
  next();
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