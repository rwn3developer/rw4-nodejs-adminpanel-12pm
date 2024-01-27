const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    subcategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subcategory'
    },
    exsubcategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'exsubcategory'
    },
    name : {
        type : String,
        require : true
    },
    price : {
        type : String,
        require : true
    },
    qty : {
        type : String,
        require : true
    },
    description : {
        type : String,
        require : true
    },
    image : {
        type : String,
        require : true
    }
})

const product = mongoose.model('product',productSchema);
module.exports = product;