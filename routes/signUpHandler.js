var express = require('express')
var router = express.Router() ;
var bcrypt = require('bcrypt');
var captchapng = require('captchapng')

router.post('/',function(req,res,next){
	console.log('Signup hai bhai')
	console.log(req.body.username)
	
	if(req.body.captchaResponse != captchaNum){
		var valicode = new Buffer(captchaImg()).toString('base64')
		res.render('signup',{message:'Wrong response to captcha',valicode:valicode})
	}else{
		User.find({username:req.body.username},function(err, user){
		if(user.length){
			console.log('Rendering with a message')
			console.log(user)
			var valicode = new Buffer(captchaImg()).toString('base64')
			res.render('signup',{message:'User with the same username exists, you might want to login',valicode:valicode})
		}else{
			var bcrypt = require('bcrypt');
			const saltRounds = 10;
			const myPlaintextPassword = req.body.password;
			bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  				var user = User({username: req.body.username, password: hash, type: 'student', moderated:false})
				user.save(function(err,user){
					console.log(user)
				}) ;
				setTimeout(function(){
					res.redirect('/login')
				},1000)
				});

			}
		})
	}
	
})
router.post('/check_availability', function(req, res, next){
	User.findOne({username: req.body.username}, function(err, user){
		if(err){
			res.render('error',{message:'Couldn\'t save, try again'})
		}else{
			if(user){
				res.json({canUse: false})
			}else{
				res.json({canUse: true})
			}
		}
	})
})

router.get('/',function(req, res, next){

   var valicode = new Buffer(captchaImg()).toString('base64')
	res.render('signup',{message:'',valicode:valicode})
})

module.exports = router ;

/*
var user  User({username: req.body.username, password: req.body.password, type: 'student'})
			user.save(function(err,user){
				console.log(user)
			}) ;
			setTimeout(function(){
				res.redirect('/login')
			},1000)
*/

var captchaImg = function(){
		captchaNum = Math.floor(Math.random()*90000+10000)
        var p = new captchapng(200,50,captchaNum); // width,height,numeric captcha
        p.color(115, 95, 197, 100);  // First color: background (red, green, blue, alpha)
        p.color(30, 104, 21, 255); 
        p.color(25,254,011,30)// Second color: paint (red, green, blue, alpha)
        var img = p.getBase64();
        var imgbase64 = new Buffer(img,'base64');
        return imgbase64;
} 

/*	if(req.body.captchaResponse != captchaNum){
		var valicode = new Buffer(captchaImg()).toString('base64')
		res.render('signup',{message:'Wrong response to captcha',valicode:valicode})
	}else{*/

		/*
User.find({username:req.body.username},function(err, user){
		if(user.length){
			console.log('Rendering with a message')
			console.log(user)
			res.render('signup',{message: 'user exists, please login'})
		}else{
			var bcrypt = require('bcrypt');
			const saltRounds = 10;
			const myPlaintextPassword = req.body.password;
			bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  				var user = User({username: req.body.username, password: hash, type: 'student', moderated:false})
				user.save(function(err,user){
					console.log(user)
				}) ;
				setTimeout(function(){
					res.redirect('/login')
				},1000)
			});

		}
	})
		*/