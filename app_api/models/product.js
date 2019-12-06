var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema= new Schema({
    author: {type: String , required: true },
    authorId: {type: String , required: true },
    rating: {type: Number, required: true , min: 0 , max: 5},
    reviewText : {type: String , required: true },
    createdOn: {type: Date , "default": Date.now },

});

var schema = new Schema({
    imagePath:{type: String, required: true , "default": "/images/products/placeHolder.png"},
    title: {type: String , required: true },
    description: {type: String , required: true ,  "default": "Null"},
    specs:{type: String, required: true ,  "default": "Null"},
    price: {type: Number , required: true, "default": 0},
    rating: {type: Number , required: true, "default": 5},
    category:{type: String, required: true, "default": "Null"},
    quantity: {type: Number, required: true , "default": 0},
    reviews :[reviewSchema]
});

module.exports = mongoose.model('Product' , schema);