const categoryModel = require('../models/categoryModel');
const subcategoryModel= require('../models/subcategoryModel');
const exsubcategoryModel= require('../models/exsubcategoryModel');


const category = async(req,res) => {
    try{
        let categoryrecord = await categoryModel.find({});
        return res.render('category/category',{
            category : categoryrecord
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

const addCategory = (req,res) => {
    return res.render('category/add_category');
}

const postCategory = async(req,res) => {
    try{
        let category = await categoryModel.create({
            category_name : req.body.category 
        })
        console.log("category add!");
        return res.redirect('/category');
    }catch(err){
        console.log(err);
        return false;
    }
}

const categoryDelete = async(req,res) => {
    try{
        let id= req.params.id;

        //find category
        let category = await categoryModel.findById(id);
        if(!category){
            console.log("record not fetch");
            return res.redirect('back');
        }
        let categoryDelete = await categoryModel.findByIdAndDelete(id);
        //category wise record delete in subcategory table
        const deletedSubcategories = await subcategoryModel.deleteMany({ categoryId: id });
        const deletedExSubcategories = await exsubcategoryModel.deleteMany({ categoryId: id });

        console.log("Category delete");
        return res.redirect('back');
    }catch(err){
        console.log(err);
        return false;
    }
}

const categoryEdit = async(req,res) => {
    try{
        let single = await categoryModel.findById(req.query.id);
        return res.render('category/edit_category',{
            single
        })
    }catch(err){
        console.log(err);
        return false;
    }
}



module.exports = {
    category,addCategory,postCategory,categoryDelete,
    categoryEdit
};