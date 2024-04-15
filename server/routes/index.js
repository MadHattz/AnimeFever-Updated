let express = require('express');
let router = express.Router();
let indexController = require('../controller/index');
let mongoose = require('mongoose');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET contact page. */
router.get('/contact', indexController.displayContactPage);
/*Get Display Page */
router.get('/display',indexController.displayDisplayPage);


// Get router for login page
router.get('/login',indexController.displayLoginPage);
//post router for login page
router.post('/login',indexController.processLoginPage);
// Get router for registration page
router.get('/register',indexController.displayRegisterPage);
//post router for registration page
router.post('/register',indexController.processRegisterPage);
// Get router for logout page
router.get('/logout',indexController.performLogout);


module.exports = router;
