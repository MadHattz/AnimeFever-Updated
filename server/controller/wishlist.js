const e = require('express');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');

// connect with Apparel Wish Database

let Wish = require('../models/wishlist');

/* CRUD Operartion*/

/* READ Operartion*/
module.exports.displaywishList = (req,res,next)=>{
    Wish.find((err, wishlist)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(apparelList);
            res.render('wish/wishlist',{
                title:"Exclusive WishList", 
                wishList: wishlist,
                displayName: req.user ? req.user.displayName:'' ,
                username: req.user ? req.user.username:'',
                email: req.user ? req.user.email:'',
            });
        }
    });
}

/* CREATE Display Operartion*/
module.exports.displayAddPage = (req,res,next)=>{
    res.render('wish/add',{title:'Add Wish',displayName: req.user ? req.user.displayName:'' ,
    username: req.user ? req.user.username:'',
    email: req.user ? req.user.email:'',})
}
/* CREATE Process Operartion*/
module.exports.processAddPage = (req,res,next)=>{
    let newWish = Wish ({
        "name":req.body.name,
        "price":req.body.price,
        "description":req.body.description,
        "size":req.body.size
    });
    Wish.create(newWish,(err,Wish) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/wishList');
        }
    });
}

/* UPDATE Display Operartion*/
module.exports.displayEditPage = (req,res,next)=>{
    let id = req.params.id;
    Wish.findById(id,(err,wishToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('wish/edit',{title: 'Edit WishList', wish:wishToEdit,
            displayName: req.user ? req.user.displayName:'' ,
            username: req.user ? req.user.username:'',
            email: req.user ? req.user.email:'',});
        }
    });
}
/* UPDATE Process Operartion*/
module.exports.processEditPage = (req,res,next)=>{
    let id = req.params.id;
    let updateWish = Wish({
        "_id":id,
        "name":req.body.name,
        "price":req.body.price,
        "description":req.body.description,
        "size":req.body.size
    });
    Wish.updateOne({_id:id},updateWish,(err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/wishList');
        }
    });
} 
/* DELETE Operartion*/
module.exports.performDelete = (req,res,next)=>{
    let id = req.params.id;
    Wish.deleteOne({_id:id},(err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/wishList');
        }
    });
}