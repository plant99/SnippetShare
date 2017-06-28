module.exports = function(req, res, next){
	Code.find({},function(err, codes){
		var length = codes.length ;
		var date = new Date();
		var time = date.getTime()
		for(var i=0;i <length ;i++){
			if(codes[i].expiresAt <= time){
				Code.remove({url: codes[i].url}, function(err, idk_what_is_this){
					if(err){
						res.render('error')
					}else{
						console.log('Checked')
						next()
					}
				})
			}
		}
		console.log('Checked2')
		next()
	})

}