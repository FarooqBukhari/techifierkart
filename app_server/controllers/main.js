var Product = require('../../app_api/models/product');
module.exports.index = function(req, res, next) {
  var successMsg = req.flash('success')[0];
    Product.find(function(err , docs){
      var ProductChunk = [];
      var chunkSize = 4;
      for(var i = 0; i < docs.length ; i+=chunkSize){
        ProductChunk.push(docs.slice(i, i+chunkSize));
      }
      res.render('shop/index', { title: 'Techifier Kart' , products: ProductChunk , successMsg: successMsg, noMessages: !successMsg});
    }); 
  };

