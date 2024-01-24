const express = require('express');

const routes = express.Router();

const passport = require('passport');

const authcontroller = require('../controllers/AuthConteroller');
const categorycontroller = require('../controllers/CategoryController');
const subcategorycontroller = require('../controllers/SubcategoryController');




routes.get('/',authcontroller.login)
routes.get('/register',authcontroller.register)

//register form post record
routes.post('/registerUser',authcontroller.registerUser);


//login user post record
routes.post('/loginUser',passport.authenticate('local',{failureRedirect : '/'}),authcontroller.loginUser);

routes.get('/dashboard',passport.checkUser,authcontroller.dashboard);

routes.get('/userprofile',passport.checkUser,authcontroller.userProfile)

routes.post('/updateProfile',passport.checkUser,authcontroller.updateProfile);


//logout
routes.get('/logout',authcontroller.userLogout);


//category
routes.get('/category',passport.checkUser,categorycontroller.category);
routes.get('/addcategory',passport.checkUser,categorycontroller.addCategory)
routes.post('/postCategory',passport.checkUser,categorycontroller.postCategory);
routes.get('/deletecategory/:id',passport.checkUser,categorycontroller.categoryDelete)
routes.get('/editcategory',passport.checkUser,categorycontroller.categoryEdit);


//maliler
routes.post('/forgotmail',authcontroller.forgotmail);
routes.get('/otp',authcontroller.otp);
routes.post('/postOtp',authcontroller.postOtp);
routes.get('/newpassword',authcontroller.newpassword);
routes.post('/postNewpassword',authcontroller.postNewpassword);


//subcategory
routes.get('/subcategory',passport.checkUser,subcategorycontroller.subcategory)
routes.get('/addsubcategory',passport.checkUser,subcategorycontroller.addsubcategory);
routes.post('/postSubCategory',passport.checkUser,subcategorycontroller.postSubCategory);
routes.get('/deletesubcategory/:id',passport.checkUser,subcategorycontroller.deletesubcategory);
routes.get('/editsubcategory',passport.checkUser,subcategorycontroller.editsubcategory);
routes.post('/postEditSubCategory',passport.checkUser,subcategorycontroller.postEditSubCategory);










module.exports = routes;