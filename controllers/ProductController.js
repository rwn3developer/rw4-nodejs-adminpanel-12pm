const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Subcategory = require('../models/subcategoryModel');
const Exsubcategory = require('../models/exsubcategoryModel');



const product=  async(req,res) => {
    
    try{
        let products = await Product.find({}).populate('categoryId').populate('subcategoryId').populate('subcategoryId');
        console.log(products);
        return res.render('product/product')

    }catch(err){
        console.log(err);
        return false;
    }
}

const addproduct = async(req,res) => {
    try{
        const category = await Category.find({});
        const subcategory = await Subcategory.find({});
        const exsubcategory = await Exsubcategory.find({});
        return res.render('product/add_product',{
            category,
            subcategory,
            exsubcategory
        })   
    }catch(err){
        return false;
    }
}

const postProduct = async(req,res) => {
    try{
        if(req.file){
            let productAdd = await Product.create({
                categoryId : req.body.category,
                subcategoryId : req.body.subcategory,
                exsubcategoryId : req.body.exsubcategory,
                name : req.body.name,
                price : req.body.price,
                qty : req.body.qty,
                description : req.body.description,
                image : req.file.path
            })
            console.log("Product Add");
            return res.redirect('/product');
        }
    }catch(err){
        return false;
    }
}

module.exports = {
    product,addproduct,postProduct
}