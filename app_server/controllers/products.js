var Pro = require('../../app_api/models/product');

module.exports.products = function(req, res, next) {
    if(req.params && req.params.category) {
      var category = req.params.category;
      Pro
        .find({category : category})
        .exec(function(err,products) {
          if(!products){
              res.json({"message" : "no products in this category found"});
            return;
          }
          else if (err){
            res.json({"message" : "category not found"});
            return;
          }
          var ProductChunk = [];
          var chunkSize = 4;
          for(var i = 0; i < products.length ; i+=chunkSize){
            ProductChunk.push(products.slice(i, i+chunkSize));
          }
          res.send(ProductChunk);
        });
      } else{
        res.json({"message" : "No category in request"});
        }
    
};

module.exports.categories = function(req, res, next) {
  res.render('shop/productByCategory', {});
};

module.exports.deleteReview = function(req, res, next) {
  if(req.user != null ){
    if(req.params && req.params.productid) {
      Pro
        .findById(req.params.productid)
        .exec(function(err,product) {
          var thisReview;
          if(!product){
              res.json({"message" : "productid not found"});
            return;
          }
          else if (err){
            res.json({"message" : "productid not found"});
            return;
          }
          if(product.reviews && product.reviews.length > 0){
            thisReview = product.reviews.id(req.params.reviewid);
            if(!thisReview){
              res.json({"message": "Review Id not found"});
              return;
            }
            else{
              var currentRating = 0;
              product.reviews.forEach(element => {
                  currentRating = currentRating + element.rating;
              });
              console.log(thisReview);
              currentRating = currentRating - thisReview.rating;
              if((product.reviews.length)-1 != 0){
                product.rating = currentRating/((product.reviews.length)-1);
                console.log(product.rating);
              }
              product.reviews.id(req.params.reviewid).remove();
              product.save(function(err,product){
                if(err){
                  res.json({"message": err});
                }
                else{
                  res.redirect('/');
                }
              });
            }
            
          }
        });
      } else{
        res.json({"message" : "No productid in request"});
        }
  }
  else{
    console.log(req.user);
    var messages = [];
    messages.push("Login First then proceed to Edit a review");
    req.flash('error' , messages);
    res.redirect('/user/signin');
  }
};

module.exports.editReviewPage = function(req, res, next) {
  if(req.user != null ){
    if(req.params && req.params.productid) {
      Pro
        .findById(req.params.productid)
        .exec(function(err,product) {
          var thisReview;
          if(!product){
              res.json({"message" : "productid not found"});
            return;
          }
          else if (err){
            res.json({"message" : "productid not found"});
            return;
          }
          if(product.reviews && product.reviews.length > 0){
            thisReview = product.reviews.id(req.params.reviewid);
            if(!thisReview){
              res.json({"message": "Review Id not found"});
              return;
            }
            else{
              res.render('shop/editReview', {product: product, review: thisReview});
            }
            
          }
        });
      } else{
        res.json({"message" : "No productid in request"});
        }
  }
  else{
    console.log(req.user);
    var messages = [];
    messages.push("Login First then proceed to Edit a review");
    req.flash('error' , messages);
    res.redirect('/user/signin');
  }
};
module.exports.editReview = function(req, res, next) {
  if(req.user != null ){
    if(req.params && req.params.productid) {
      Pro
        .findById(req.params.productid)
        .exec(function(err,product) {
          var thisReview;
          if(!product){
              res.json({"message" : "productid not found"});
            return;
          }
          else if (err){
            res.json({"message" : "productid not found"});
            return;
          }
          if(product.reviews && product.reviews.length > 0){
            thisReview = product.reviews.id(req.params.reviewid);
            if(!thisReview){
              res.json({"message": "Review Id not found"});
              return;
            }
            else{
              var currentRating = 0;
              product.reviews.forEach(element => {
                currentRating = currentRating + element.rating;
              });
              currentRating -= (thisReview.rating);
              currentRating += parseInt(req.body.starRating);
              product.rating = currentRating/(product.reviews.length);
              thisReview.reviewText = req.body.productReview;
              thisReview.rating = req.body.starRating;
              product.save(function(err,product){
                if(err){
                  res.json({"message": err});
                }
                else{
                  res.redirect('/');
                }
              });
            }
            
          }
        });
      } else{
        res.json({"message" : "No productid in request"});
        }
  }
  else{
    console.log(req.user);
    var messages = [];
    messages.push("Login First then proceed to Edit a review");
    req.flash('error' , messages);
    res.redirect('/user/signin');
  }
};

module.exports.productsaddreview = function(req, res, next) {
  if(req.user != null ){
    if(req.params && req.params.productid) {
      Pro
        .findById(req.params.productid)
        .exec(function(err,product) {
          if(!product){
              res.json({"message" : "productid not found"});
            return;
          }
          else if (err){
            res.json({"message" : "productid not found"});
            return;
          }
          else{
            doAddReview(req,res,product);
            res.redirect('/product/view/'+product._id);
          }
        });
      } else{
        res.json({"message" : "No productid in request"});
        return;
        }
  }
  else{
    console.log(req.user);
    var messages = [];
    messages.push("Login First then proceed to writing a review");
    req.flash('error' , messages);
    res.redirect('/user/signin');
  }
  
};

module.exports.productsreadone = function(req, res){
  if(req.params && req.params.productid) {
    Pro
      .findById(req.params.productid)
      .exec(function(err,product) {
        if(!product){
            res.json({"message" : "productid not found"});
          return;
        }
        else if (err){
          res.json({"message" : "productid not found"});
          return;
        }
        var specs = [];
        var reviews = [];
        var haveReviews = 0;
        var haveSpecs = 0;
        if(product.specs != "Null")
        {
          haveSpecs = 1;
          specs = (product.specs).split(".");
        }
        if(product.reviews.length != 0)
        {
          reviews = product.reviews;
          haveReviews = 1;
        }
        res.render('shop/products',{product:product , haveSpecs: haveSpecs , specs:specs , haveReviews , reviews: reviews , req: req});
      });
    } else{
      res.json({"message" : "No productid in request"});
      return;
      }
  };

  var doAddReview = function(req,res,product){
    product.reviews.push({
      author: req.user.fname+" "+req.user.lname,
      authorId: req.user._id,
      rating: req.body.starRating,
      reviewText: req.body.productReview
    });
    var currentRating = 0;
    product.reviews.forEach(element => {
      currentRating = currentRating + element.rating;
    });
    product.rating = currentRating/(product.reviews.length);
    product.save(function(err,product){
      if(err){
        res.json({"error": "Error adding Review"});
        return;
      }
      return;
    });
  };
  