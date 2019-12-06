var Cart = require('../models/cart');
module.exports.shoppingcart = function(req, res, next) {
    if(!req.session.cart){
      res.render('shop/cart', { products: null });
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/cart', { products: cart.generateArray(), totalPrice: cart.totalPrice });
  };