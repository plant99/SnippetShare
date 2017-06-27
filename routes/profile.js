var express = require('express') 
var router = express.Router()

router.get('/',function(req, res, next){
	User.findOne({username:req.decoded._doc.username}, function(err, user){
		if(user){
			var codeUrls = []  ;
			Code.find({owner: user.username},function(err, codes){
				console.log(user)
				console.log(codes, 'chutiya')
				res.render('profile', {user: user, codes: codes})
			})
		}else{
			res.redirect('profile')
		}
	})
})



module.exports = router ;