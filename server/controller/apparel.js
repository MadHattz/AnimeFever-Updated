const e = require('express');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');

// connect with Apparel Database

let Apparel = require('../models/apparel');
const wishlist = require('../models/wishlist');

/* CRUD Operartion*/

/* READ Operartion*/
module.exports.displayapparelList = (req,res,next)=>{
    Apparel.find((err, apparellist)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(apparelList);
            res.render('apparel/list',{
                title:"Apparels", 
                apparelList: apparellist,
                displayName: req.user ? req.user.displayName:'' ,
                username: req.user ? req.user.username:'',
                email: req.user ? req.user.email:'',
            });
        }
    });
}

/* CREATE Display Operartion*/
module.exports.displayAddPage = (req,res,next)=>{
    res.render('apparel/add',{title:'Add Apparel',
    displayName: req.user ? req.user.displayName:'' ,
    username: req.user ? req.user.username:'',
    email: req.user ? req.user.email:'',})
}
/* CREATE Process Operartion*/
module.exports.processAddPage = (req,res,next)=>{
    let newApparel = Apparel ({
        "name":req.body.name,
        "price":req.body.price,
        "description":req.body.description,
        "size":req.body.size
    });
    Apparel.create(newApparel,(err,Apparel) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/apparelList');
        }
    });
}

/* UPDATE Display Operartion*/
module.exports.displayEditPage = (req,res,next)=>{
    let id = req.params.id;
    Apparel.findById(id,(err,apparelToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('apparel/edit',{title: 'Edit Apparel', apparel:apparelToEdit,
            displayName: req.user ? req.user.displayName:'' ,
            username: req.user ? req.user.username:'',
            email: req.user ? req.user.email:'',});
        }
    });
}
/* UPDATE Process Operartion*/
module.exports.processEditPage = (req,res,next)=>{
    let id = req.params.id;
    let updateApparel = Apparel({
        "_id":id,
        "name":req.body.name,
        "price":req.body.price,
        "description":req.body.description,
        "size":req.body.size
    });
    Apparel.updateOne({_id:id},updateApparel,(err) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/apparelList');
        }
    });
    
}
/* DELETE Operartion*/
module.exports.performDelete = (req,res,next)=>{
    let id = req.params.id;
    Apparel.deleteOne({_id:id},(err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/apparelList');
        }
    });
}