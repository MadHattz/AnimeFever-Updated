const e = require('express');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
// connect with apparelTrain

let Wish = require('../models/wishlist');
let wishController = require('../controller/wishlist');
/* CRUD Operartion*/
/*Checking if user is authenticated*/
function requireAuth(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}
/* Read Operation */
/* Get route for workout list */

router.get('/', wishController.displaywishList);
router.get('/home', wishController.displaywishList);

/* Add Operation */
/* Get route for displaying the Add-Page -- Create Operation*/
router.get('/add',requireAuth, wishController.displayAddPage);
/* Post route for processing the Add-Page -- Create Operation*/
router.post('/add',requireAuth, wishController.processAddPage);

/* Edit Operation */
/* Get route for displaying the Edit Operation -- Update Operation*/
router.get('/edit/:id',requireAuth, wishController.displayEditPage);
/* Post route for displaying the Edit Operation -- Update Operation*/
router.post('/edit/:id',requireAuth, wishController.processEditPage);

/* Delete Operation*/
/* Get to perform delete operation -- Deletion*/
router.get('/delete/:id',requireAuth, wishController.performDelete);


module.exports=router;

