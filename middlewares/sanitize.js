var sanitize = require('mongo-sanitize')
module.exports = function(req, res, next){
	if(req.body.username){
		var x = sanitize(req.body.username) ;
		console.log(x)
		req.body.username = sanitize(req.body.username)
	}
	if(req.body.password){
		req.body.password = sanitize(req.body.password)
	}
	if(req.body.url){
		req.body.url = sanitize(req.body.url)
	}
}