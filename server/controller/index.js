let express = require('express');
let passport = require('passport');
let router = express.Router();
let jwt = require('jsonwebtoken');
let DB = require('../config/db2');
let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next)=>{
    res.render('index', { 
        title: 'Home',
        displayName: req.user ? req.user.displayName:'' ,
        username: req.user ? req.user.username:'',
        email: req.user ? req.user.email:'',    
    });
}
module.exports.displayContactPage = (req, res, next)=>{
    res.render('index', { 
        title: 'Contact Me',
        displayName: req.user ? req.user.displayName:'' ,
        username: req.user ? req.user.username:'',
        email: req.user ? req.user.email:'',   
    });
}
module.exports.displayDisplayPage = (req, res, next)=>{
    res.render('index', { 
        title: 'Display',
        displayName: req.user ? req.user.displayName:'' ,
        username: req.user ? req.user.username:'',
        email: req.user ? req.user.email:'',   
    });
}


module.exports.displayLoginPage = (req, res,next) => {
    if (!req.user)
    {
        res.render('auth/login',
        {
            title: 'Login',
            message: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName: ''
        })
    }
    else
    {
        return res.redirect('/')
    }
}
module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',(err,user, info)=>
    {
        // server error
        if(err)
        {
            return next(err);
        }
        // is a login error
        if(!user)
        {
            req.flash('loginMessage',
            'AuthenticationError');
            return res.redirect('/login');
        }
        req.login(user,(err) => {
            if(err)
            {
                return next(err)
            }
            const payload = 
            {
                id: user._id,
                displayName: user.displayName,
                password: req.body.password,
                username: user.username,
                email: user.email
            }

             const authToken = jwt.sign(payload, DB.secret, {
                 expiresIn: 604800 // 1 week
             });
            return passport.authenticate('local')(req,res,()=>{
                res.redirect('/');
            })  
        });
    })(req,res,next)
}

module.exports.displayRegisterPage = (req,res,next)=>{
    // check if the user is not already logged in 
    if(!req.user)
    {
        res.render('auth/register',
            {
                title: 'Register',
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName: ''
            })
    }
    else
    {
        return res.redirect('/')
    }
}
module.exports.processRegisterPage = (req,res,next) => {
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email:req.body.email,
        displayName: req.body.displayName
    })
    User.register(newUser, req.body.password, (err) =>{
        if(err)
        {
            console.log("Error: Inserting the new user");
            if(err.name=="UserExistsError")
                {
                    req.flash('registerMessage',
                    'Registration Error: User Already Exists');
                }
            return res.render('/register',
            {
                title:'Register',
                message: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName:''
            });
        }
        else
        {
        //    res.json({success:true, msg:'User registered Successfully'});
            // if registration is successful
            return passport.authenticate('local')(req,res,()=>{
                res.redirect('/');
            })    
        }
    })
}


module.exports.performLogout = (req,res,next)=>
{
        
    req.logout(function(err){
        if(err){
            return next(err);
        }
    })
    res.redirect('/');
}
