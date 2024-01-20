const passport = require('passport');

const passportLocal = require('passport-local').Strategy;

const userModel = require('../models/userModel');

passport.use(new passportLocal({
    usernameField : 'email'
},async(email,password,done)=>{
    try{
        let user = await userModel.findOne({email : email});
        if(!user || user.password != password){
            console.log("username and password invalid");
            return done(null,false)
        }
        return done(null,user);
    }catch(err){
        done(null,err);
        return false;
    }
}))

passport.serializeUser((user,done)=>{
    return done(null,user._id);
})

passport.deserializeUser((id,done)=>{
    userModel.findById(id)
    .then((user)=>{
        return done(null,user)
    }).catch((err)=>{
        return done(null,false)
    })
})

passport.checkUser = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');  
}

passport.setUser = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.users = req.user
    }
    return next();
}


module.exports = passport;