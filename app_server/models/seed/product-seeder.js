var Product = require('../../../app_api/models/product');
var mongoose = require('mongoose');
var mongoURI = 'mongodb://localhost:27017/db';
if(process.env.NODE_ENV === 'production'){
    mongoURI = 'mongodb://admin:Hello123@ds133353.mlab.com:33353/techifierkart';
  }
mongoose.connect( mongoURI, {useNewUrlParser: true});
var products = [
    new Product({
        imagePath: 'https://static.comicvine.com/uploads/original/14/146991/6309469-episodios.png',
        title: 'Goku Ultra Instinct',
        description: 'Hello Mama',
        price: 1000,
        rating: 4.8,
        category: 'Graphic Cards'
    })
    
];
var done = 0;
for(var i=0; i < products.length;i++){
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
          exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}