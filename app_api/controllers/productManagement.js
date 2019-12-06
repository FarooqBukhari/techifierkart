var mongoose = require('mongoose');
var Product = require('../models/product');
var request = require('request');

module.exports.addProductPage = function(req, res, next) {
    var messages = req.flash('error');
    res.render('admin/addProduct', {currentUser: req.user , messages: messages , hasErrors: messages.length > 0});
  };

module.exports.addProduct = function(req, res, next) {
    var errors = false;
    var messages = [];
    if(req.body.title == ""){
        messages.push("Invalid Product Name");
        errors = true;
    }
    if(req.body.description == ""){
        messages.push("Invalid Product Description");
        errors = true;
    }
    if(req.body.specs == ""){
        messages.push("Invalid Product Specs");
        errors = true;
    }
    if(req.body.price == "" || !(/^\d+$/.test(req.body.price))){
        messages.push("Invalid Product Price");
        errors = true;
    }
    if(req.body.rating == "" || !(/^\d+$/.test(req.body.rating))){
        messages.push("Invalid Product Rating");
        errors = true;
    }
    if(req.body.category == ""){
        messages.push("Invalid Product Category");
        errors = true;
    }
    if(req.body.imgPath == ""){
        messages.push("Invalid Product Image");
        errors = true;
    }
    if(req.body.quantity == "" || !(/^\d+$/.test(req.body.quantity))){
        messages.push("Wrong Product Quantity");
        errors = true;
    }
    if(req.body.quantity != "" || !(/^\d+$/.test(req.body.quantity))){
        if(parseInt(req.body.quantity) < 0){
            messages.push("Wrong Product Quantity");
            errors = true;
        }
        
    }
    if(errors){
        res.render('admin/addProduct', {currentUser: req.user , messages: messages , hasErrors: messages.length > 0});
    }
    else{
        Product.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            rating: req.body.rating,
            category: req.body.category,
            imagePath: req.body.imgPath,
            quantity: req.body.quantity,
            specs: req.body.specs
        },function(err, product){
            if (err){
                res.send(err);
            }
            res.redirect('/admin/panel');
        });
    }
    
};

module.exports.deleteProductPage = function(req, res, next) {
    Product.find(function(err , docs){
        var ProductChunk = [];
        var chunkSize = 4;
        for(var i = 0; i < docs.length ; i+=chunkSize){
          ProductChunk.push(docs.slice(i, i+chunkSize));
        }
        res.render('admin/deleteProduct', {currentUser: req.user ,  products: ProductChunk});
      });
};

module.exports.deleteProduct = function(req, res, next) {
    var productId = req.params.productId;
    var requestOptions = {
        url : "https://techifierkart.herokuapp.com/admin/deleteProduct/" + productId,
        method : "DELETE",
        json: {}
    };
    request(requestOptions , function(err, response, body){
        deleteProduct(req,res , productId);
    });
};

module.exports.updateProductPage = function(req, res, next) {
    Product.find(function(err , docs){
        var ProductChunk = [];
        var chunkSize = 4;
        for(var i = 0; i < docs.length ; i+=chunkSize){
          ProductChunk.push(docs.slice(i, i+chunkSize));
        }
        res.render('admin/updateProduct', {currentUser: req.user ,  products: ProductChunk});
      });
};

module.exports.updateProductAttrs = function(req, res, next) {
    var messages = [];
    var productId = req.params.productId;
    console.log(productId);
    Product.findById(productId,function(err, product){
        if(err){
            res.send(err);
        }
        res.render('admin/updateProductAttrs',{currentUser: req.user ,product: product, messages: messages , hasErrors: messages.length > 0});
    });
};
module.exports.updateProduct = function(req, res, next) {
    var productId = req.params.productId;
    var requestOptions = {
        url : "https://techifierkart.herokuapp.com/admin/updateProduct/" + productId,
        method : "PUT",
        json: {}
    };
    request(requestOptions , function(err, response, body){
        updateProduct(req,res , productId);
    });
};


var deleteProduct = function(req , res , productId){
    if(productId)
    {
        Product.findByIdAndDelete(productId,function(err, product){
            if(err){
                res.send(err);
            }
        res.redirect('/admin/panel');
        });
    }
    else{
        res.json({"message": "No Product Id"});
    }
};

var updateProduct = function(req , res , productId){
    var errors = false;
    var messages = [];
    if(req.body.title == ""){
        messages.push("Invalid Product Name");
        errors = true;
    }
    if(req.body.description == ""){
        messages.push("Invalid Product Description");
        errors = true;
    }
    if(req.body.specs == ""){
        messages.push("Invalid Product Specs");
        errors = true;
    }
    if(req.body.price == "" || !(/^\d+$/.test(req.body.price))){
        messages.push("Invalid Product Price");
        errors = true;
    }
    if(req.body.rating == "" || !(/^\d+$/.test(req.body.rating))){
        messages.push("Invalid Product Rating");
        errors = true;
    }
    if(req.body.category == ""){
        messages.push("Invalid Product Category");
        errors = true;
    }
    if(req.body.imgPath == ""){
        messages.push("Invalid Product Image");
        errors = true;
    }
    if(req.body.quantity == "" || !(/^\d+$/.test(req.body.quantity))){
        messages.push("Wrong Product Quantity");
        errors = true;
    }
    if(req.body.quantity != "" || !(/^\d+$/.test(req.body.quantity))){
        if(parseInt(req.body.quantity) < 0){
            messages.push("Negative Product Quantity");
            errors = true;
        }
        
    }
    if(errors){
        Product.findById(productId,function(err, product){
            if(err){
                res.send(err);
            }
            res.render('admin/updateProductAttrs',{currentUser: req.user ,product: product, messages: messages , hasErrors: messages.length > 0});
        });
    }
    else{
        if(productId)
        {
            Product.findById(productId,function(err, product){
                if(err){
                    res.send(err);
                }
                product.title = req.body.title;
                product.description = req.body.description;
                product.specs = req.body.specs;
                product.price = req.body.price;
                product.category = req.body.category;
                product.rating = req.body.rating;
                product.imagePath = req.body.imgPath;
                product.quantity = req.body.quantity;
                product.save(function(err,product){
                    if(err){
                        res.send(err);
                    }
                    res.redirect('/admin/panel');
                });
            });
        }
        else{
            res.json({"message": "No Product Id"});
        }
    }    
};
