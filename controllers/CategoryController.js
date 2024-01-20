const categoryModel = require('../models/categoryModel');

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
        let deleteCategory = await categoryModel.findByIdAndDelete(id);
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