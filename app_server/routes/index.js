var express = require('express');
var router = express.Router();


var ctrlMain = require('../controllers/main');
var ctrlCheckout = require('../controllers/checkout');
var ctrlAbout = require('../controllers/about');
var ctrlproducts = require('../controllers/products');
var ctrladdcart = require('../controllers/addtocart');
var ctrlshoppingcart = require('../controllers/shoppingCart');
var ctrlAjax = require('../controllers/ajaxCalls');

/* GET home page. */
router.get('/',ctrlMain.index);
/* GET product page. */
router.get('/products/:category',ctrlproducts.products);
/* GET about page. */
router.get('/about',ctrlAbout.about);
/* GET checkout page. */
router.get('/checkout',isLoggedin,ctrlCheckout.checkout);
router.post('/checkout',isLoggedin,ctrlCheckout.checkoutpost);
/* GET addtocart req. */
router.get('/add-to-cart/:id',ctrladdcart.cart);
/* GET reduceByOne req. */
router.get('/reduce/:id',ctrladdcart.reducecart);
/* GET removeAll req. */
router.get('/remove/:id',ctrladdcart.removeAllcart);
/* GET shoppingcart req. */
router.get('/shopping-cart',ctrlshoppingcart.shoppingcart);
/* Get Product by category*/ 
router.get('/categories',ctrlproducts.categories);
router.get('/product/:category',ctrlproducts.products);
/* Get Single Product View*/ 
router.get('/product/view/:productid',ctrlproducts.productsreadone);
/* Post Single Product Review*/ 
router.post('/product/view/:productid/review',isLoggedin,ctrlproducts.productsaddreview);
/* Get Edit Review View*/ 
router.get('/product/:productid/review/edit/:reviewid',isLoggedin,ctrlproducts.editReviewPage);
/* Post Edit Review*/ 
router.post('/product/:productid/review/edit/:reviewid',isLoggedin,ctrlproducts.editReview);
/* Delete Review*/ 
router.get('/product/:productid/review/delete/:reviewid',isLoggedin,ctrlproducts.deleteReview);


//Ajax Calls
router.get('/checkemail/:email', ctrlAjax.checkemail);
router.get('/search/:title', ctrlAjax.searchAutocomplete);


module.exports = router;

function isLoggedin(req, res , next){
    if(req.isAuthenticated()){
      return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
  }