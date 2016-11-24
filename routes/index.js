var express = require('express');
var router = express.Router();
var users = require('./user.js');
var createEvent = require('./createEvent');
var event = require('./event');
var Event = require('../models/schema/event');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
		res.render('index', { user : req.user });
	});

	router.get('/login', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('login', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET profile page */
	router.get('/profile', isAuthenticated, function(req, res){
		res.render('profile', { user: req.user });
	});

	router.post('/profile', isAuthenticated, users.updateProfile);
	// 	var u = users.updateProfile(req, res);
	// 	console.log(u);
	// 	res.render('home', {user: u});
	// })
		// console.log(req.body.user.name);
		// console.log(req.user);
		// res.send(req.body);
		//res.render('home', { user: req.user })

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* GET Create Event Page */
	router.get('/createEvent', isAuthenticated, function(req, res) {
		res.render('createEvent', { user: req.user });
	});

	/* POST Create Event */
	router.post('/createEvent', isAuthenticated, createEvent.addEvent);

	/* GET Create Event Page */
	router.get('/event', isAuthenticated, event.loadEvent);

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}




