var Cart = require('../models/cart');
var Order = require('../models/order');
module.exports.checkout = function(req, res, next) {
  if(!req.session.cart){
    res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout',{products: cart.generateArray(),total: cart.totalPrice , totalQty: cart.totalQty, errMsg: errMsg , noErrors: !errMsg});
  };
module.exports.checkoutpost = function(req, res, next) {
  if(!req.session.cart){
    res.redirect('/shopping-cart');
  }
  console.log("1st");
  var cart = new Cart(req.session.cart);
  var stripe = require("Stripe")(
    "sk_test_YFs5h7pRClxHzLCmGCtZ4w1W"
  );

  stripe.charges.create({
    amount: cart.totalPrice*100,
    currency: "usd",
    source: req.body.stripeToken,
    description: "Test Charge"
  },function(err,Charge){
    if(err){
      req.flash('error', err.message);
      console.log("2nd Error");
      return res.redirect('/checkout');
    }
    var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address + "," + req.body.zip,
      name: req.body.firstname+" " +req.body.lastname,
      paymentId: Charge.id
    });
    order.save(function(err, result){
      if(err){
        req.flash('error', 'Failed to Buy Products. Try Again!');
        res.redirect("/checkout");
        return;
      }
      console.log("3st");
      req.flash('success', 'Successfully Bought Products!');
      req.session.cart = null;
      res.redirect("/");
    });
    
  });
};