const categoryModel = require('../models/categoryModel');
const subcategoryModel = require('../models/subcategoryModel');
const exsubcategoryModel = require('../models/exsubcategoryModel');


const exsubcategory = async(req,res) => {
    try{
        let exsubcategoryRecord = await exsubcategoryModel.find({}).populate('categoryId').populate('subcategoryId');
        return res.render('exsubcategory/exsubcategory',{
            exsubcategory : exsubcategoryRecord
        });
    }catch(err){
        console.log(err);
        return false
    }
}

const addexsubcategory = async(req,res) => {
    try{
        let category = await categoryModel.find({});
        let subcategory = await subcategoryModel.find({});

        return res.render('exsubcategory/add_exsub_category',{
            category,
            subcategory
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

const postExSubCategory = async(req,res) => {
    try{
        let exsubcate = await exsubcategoryModel.create({
            categoryId : req.body.category,
            subcategoryId : req.body.subcategory,
            exsubcategory : req.body.exsubcategory,
        })
        console.log("Exsubcategory add");
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    exsubcategory,addexsubcategory,postExSubCategory
}