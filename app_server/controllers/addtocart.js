var Cart = require('../models/cart');
var Product = require('../../app_api/models/product');
module.exports.cart = function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    Product.findById(productId,function(err, product){
        if(err){
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/');
    });
};

module.exports.reducecart = function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
};

module.exports.removeAllcart = function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    cart.remove(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
};