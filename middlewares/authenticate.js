var jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
	console.log('Chutiya')
	console.log(req.body)
	var token = req.body.token || req.headers['x-access-token'] || req.query.token || req.cookies.token
	console.log(token)
	if(token){
		jwt.verify(token, superSecret, function(err, decoded){
			console.log(err) ;
			if(err){
				res.render('error', {
					message: 'Login wasn\'t a success, try again'
				})
			}
			req.decoded = decoded ;
			console.log(decoded)
			next() ;
		})
	}else{
		res.redirect('/login')
	}
}