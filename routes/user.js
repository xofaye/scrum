var User = require('../models/schema/user');
// var dbConfig = require('../db');
// var mongoose = require('mongoose');
// // Connect to DB
// mongoose.connect(dbConfig.url);

module.exports.updateProfile = function(req, res) {
	var u = req.user;
	console.log(u._id);
	var newName = req.body.user.name;
	var newEmail = req.body.user.email;
	var newBio = req.body.user.bio;
	var newFavSports = req.body.user.favsport;
	User.findById(u._id, function(err, user){
		if (err) throw err;
		res.send(user);
	})
	//res.send(u);

}