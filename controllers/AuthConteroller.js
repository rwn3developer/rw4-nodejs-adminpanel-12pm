const nodemailer = require('nodemailer');

const userModel = require('../models/userModel');

const dashboard = (req,res) => {
    return res.render('dashboard');
}

const login = (req,res) => {
    if(res.locals.users){
        return res.redirect('/dashboard');
    }
    return res.render('index');
}

const register = (req,res) => {
    return res.render('register');
}

const registerUser = async(req,res) => {
    try{
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let cpassword = req.body.cpassword;
        if(cpassword == password){
            if(!name || !email || !password){
                console.log("All field is required");
                return false;
            }
            let user = await userModel.create({
                    name: name,
                    email : email,
                    password : password
            })
            req.flash('success', 'User register')
            return res.redirect('/register');
        }else{
            console.log("password or confirm password not same");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}


const loginUser = (req,res) => {
    return res.redirect('/dashboard')
}

const userLogout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            console.log("User not logout");
            return false;
        }
        return res.redirect('/');
    })
}

const userProfile = async(req,res) => {
    try{
        return res.render('userprofile')
    }catch(err){
        console.log(err);
        return false;
    }
}

const updateProfile = async(req,res) => {
    try{
        let user = await userModel.findByIdAndUpdate(req.body.updateid,{
            name : req.body.name,
            email : req.body.email,    
            password : req.body.password
        }) 
        console.log("Profile Update");
        return res.redirect('/dashboard');
    }catch(err){
        console.log(err);
        return false;
    }
}

const forgotmail = async(req,res) => {
    try {
        let email = req.body.usermail;
        let otp = Math.floor(Math.random() * 100000);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rwn3developer11@gmail.com',
                pass: 'iohm ogqa ddaw lvgi'
            }
        });
    
        var mailOptions = {
            from: 'rwn3developer11@gmail.com',
            to: email,
            subject: 'Your OTP', // Set subject as a string, not HTML
            html: `<h1>Your OTP: ${otp}</h1>` // Include HTML content using the 'html' property
        };
    
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.cookie('otp',{
                    email,otp
                })
                return res.redirect('/otp');
            }
        });
    } catch (err) {
        return false;
        console.log(err);
    }  
}

const otp = async(req,res) => {
    return res.render('otp');
}

const postOtp = (req,res) => {
    let userotp = req.body.otp
    if(userotp == req.cookies['otp'].otp){
        return res.redirect('newpassword');
    }else{
        console.log("Otp is Wrong");
        return res.redirect('back')
    }
}
const newpassword = (req,res) => {
    return res.render('newpassword');
}

const postNewpassword = async(req,res) => {
    try{
        let email = req.cookies['otp'].email;
        if(req.body.newpassword == req.body.cpassword){
            let up = await userModel.findOneAndUpdate({email,email},{
                password : req.body.newpassword
            })
            console.log("password successfully update");
            res.clearCookie('otp');
            return res.redirect('/');
        }else{
            console.log("Password and Confirm password not same");
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false
    }
   
}

module.exports = {
    dashboard,login,register,registerUser,loginUser,userLogout,userProfile,updateProfile,
    forgotmail,otp,postOtp,newpassword,postNewpassword
}