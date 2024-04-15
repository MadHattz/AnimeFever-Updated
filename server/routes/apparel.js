const e = require('express');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
// connect with apparelTrain

let Apparel = require('../models/apparel');
let apparelController = require('../controller/apparel');
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

router.get('/', apparelController.displayapparelList);
router.get('/home', apparelController.displayapparelList);

/* Add Operation */
/* Get route for displaying the Add-Page -- Create Operation*/
router.get('/add',requireAuth, apparelController.displayAddPage);
/* Post route for processing the Add-Page -- Create Operation*/
router.post('/add',requireAuth, apparelController.processAddPage);

/* Edit Operation */
/* Get route for displaying the Edit Operation -- Update Operation*/
router.get('/edit/:id',requireAuth, apparelController.displayEditPage);
/* Post route for displaying the Edit Operation -- Update Operation*/
router.post('/edit/:id',requireAuth, apparelController.processEditPage);

/* Delete Operation*/
/* Get to perform delete operation -- Deletion*/
router.get('/delete/:id',requireAuth, apparelController.performDelete);


module.exports=router;

