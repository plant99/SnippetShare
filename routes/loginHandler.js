var express = require('express')
var router = express.Router() ;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt') ;
const saltRounds = 10;

router.post('/',function(req,res,next){
	console.log(req.cookies)
	User.findOne({username:req.body.username} , function(err,user){

		if(err) throw err ;

		if(!user){
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		}else if(user){
			bcrypt.compare(req.body.password,user.password,function(err, result){
				if(!result){
					res.json({ success: false, message: 'Authentication failed. Wrong Password.' });	
				}else{
					var token = jwt.sign(user, superSecret);
					res.json({
			          success: true,
			          message: 'Enjoy your token!',
			          token: token
			        });	
			        res.end()
				}
			} )

			
			
		}
	})
})

router.get('/',function(req,res,next){
	res.render('login') 
})
module.exports = router ;
/*
if(user.password != req.body.password){
				res.json({ success: false, message: 'Authentication failed. Wrong Password.' });	
			}else{
				var token = jwt.sign(user, superSecret);
				res.json({
		          success: true,
		          message: 'Enjoy your token!',
		          token: token
		        });	
		        res.end()
			}
*/