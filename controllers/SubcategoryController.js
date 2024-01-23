const categoryModel = require('../models/categoryModel');
const subcategoryModel = require('../models/subcategoryModel');


const subcategory = async(req,res) => {
    try{
        let subcategoryData = await subcategoryModel.find({}).populate('categoryId');
        return res.render('subcategory/subcategory',{
            subcategory : subcategoryData
        });
    }catch(err){
        console.log(err);
        return false
    }
   
}

const addsubcategory = async(req,res) => {
    try{
        let category = await categoryModel.find({});
        return res.render('subcategory/add_sub_category',{
            category
        });
    }catch(err){
        console.log(err);
        return false
    }  
}
const postSubCategory = async(req,res) => {
    try{
        let subcategoryrecord = await subcategoryModel.create({
            categoryId : req.body.category,
            subcategory : req.body.subcategory
        })
        console.log("Category successfully add");
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return false
    }
}

module.exports = {
    subcategory,addsubcategory,postSubCategory
};