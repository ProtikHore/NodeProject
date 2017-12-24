var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');


router.get('/', function(request, response){
	response.render('login/index');
});

router.post('/', function(request, response){

	var user = {
		username: request.body.username,
		password: request.body.password
	};

	userModel.validate(user, function(valid){
		if(valid)
		{
			request.session.loggedUsername = request.body.username;
			response.redirect('/home');
		}
		else
		{
			response.redirect('/login');
		}
	});
});

module.exports = router;
