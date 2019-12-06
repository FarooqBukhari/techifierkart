var User = require('../models/user');
var Product = require('../../app_api/models/product');
module.exports.checkemail = function(req, res){
  var email = req.params.email;
  User.findOne({'email': email}, function(err, user){
    if(err){
        res.json({"err": err});
        return;
    }
    if(user){
      res.json({"message":"taken"});
      return;
    }
    res.json({"message":"not_taken"});
    return;
  });
};

module.exports.searchAutocomplete = function(req, res){
  console.log(req.params.title);
  Product.find({'title': { '$regex' : req.params.title , '$options' : 'i' }}, function(err , docs){
    if(err){
      res.json({"err": err});
      return;
    }
    var ProductChunk = [];
    for(var i = 0; i < docs.length ; i++){
      ProductChunk.push(docs[i]);
    }
    res.send(ProductChunk);
    return;
  });
};