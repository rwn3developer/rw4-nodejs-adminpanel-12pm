const categoryModel = require('../models/categoryModel');
const subcategoryModel = require('../models/subcategoryModel');
const exsubcategoryModel = require('../models/exsubcategoryModel');



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

const deletesubcategory = async(req,res) => {
    try{
        await subcategoryModel.findByIdAndDelete(req.params.id);

        //subcategory wise record delete in exsubcategory table
        //subcategory primary id and exsubcategory foreign key
        await exsubcategoryModel.deleteMany({ subcategoryId: req.params.id });
        console.log("Subcategory deelete");
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return false
    }
}

const editsubcategory = async(req,res) => {
    try{
        let category = await categoryModel.find({});
        let single = await subcategoryModel.findById(req.query.id).populate('categoryId');
        console.log(single);
       return res.render('subcategory/edit_subcategory',{
            category,
            single
       });
    }catch(err){
        console.log(err);
        return false
    }
}

const postEditSubCategory = async(req,res) => {
    try{
        await subcategoryModel.findByIdAndUpdate(req.body.editid,{
            categoryId : req.body.category,
            subcategory : req.body.subcategory
        })
        console.log("Subcategory is update");
        return res.redirect('/subcategory')
    }catch(err){
        console.log(err);
        return false
    }
}

module.exports = {
    subcategory,addsubcategory,postSubCategory,deletesubcategory,
    editsubcategory,postEditSubCategory
};