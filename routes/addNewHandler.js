var express = require('express') 
var router = express.Router()

router.get('/',function(req, res, next){
	res.render('add_new',{message:''})
})
router.get('/file',function(req, res, next){
	res.render('uploadFile',{message:''})
})

router.post('/',function(req, res, next){
	var checkedUrl,uncheckedUrl = randomNumberComplete() ;

	Code.findOne({url: uncheckedUrl},function(err, codeCheck){
		if(codeCheck){
			if(codeCheck.url[6]){
				var index = Number(codeCheck.url[6]) ;
				index++ ;
				checkedUrl = codeCheck.url.slice(0,5) + index ;
				saveCode(checkedUrl, req, res)

			}else{
				checkedUrl = codeCheck.url ;
				checkedUrl.push('0')
				saveCode(checkedUrl, req, res)
			}
		}else{
			saveCode(uncheckedUrl,  req, res)
		}
	})
})
router.post('/file',function(req, res, next){
	var checkedUrl,uncheckedUrl = randomNumberComplete() ;

	Code.findOne({url: uncheckedUrl},function(err, codeCheck){
		if(codeCheck){
			if(codeCheck.url[6]){
				var index = Number(codeCheck.url[6]) ;
				index++ ;
				checkedUrl = codeCheck.url.slice(0,5) + index ;
				saveCode1(checkedUrl, req, res)

			}else{
				checkedUrl = codeCheck.url ;
				checkedUrl.push('0')
				saveCode1(checkedUrl, req, res)
			}
		}else{
			saveCode1(uncheckedUrl,  req, res)
		}
	})
})

module.exports = router ;

function randomNumberComplete(){
	var url='' ;
	for(i=0;i<6;i++){
		url += String.fromCharCode(randomNumber())
	}
	return url ;
}
function randomNumber(){
	var code,deciding = Math.floor(Math.random()*2) ;
	console.log(deciding)
	if(deciding){
		code = Math.floor(Math.random()*26) + 65 ;
	}else{
		code = Math.floor(Math.random()*26) + 97 ;
	}
	return code ;
}
function saveCode(checkedUrl, req, res){
	var date = new Date()
	var code = new Code({
		header: req.body.header,
		content: req.body.content,
		type: req.body.type,
		owner: req.decoded._doc.username,
		url:checkedUrl,
		language: req.body.language,
		expiresAt: Number(date.getTime()) + Number(req.body.expiresAt)* 86400000
	})

	code.save(function(err, codeSaved){
		User.findOne({username: code.owner}, function(err, user){
			user.codes.push(code.header)
			user.save(function(err, headerSaved){
				console.log(codeSaved, headerSaved) ;
				var message  = 'Your code was successfully saved and live at /'+codeSaved.url ;
				res.render('add_new', {message: message})
			})
		})
	})
}

function saveCode1(checkedUrl, req, res){
	var date = new Date()
	var code = new Code({
		header: req.body.header,
		content: req.files.content.data.toString(),
		type: req.body.type,
		owner: req.decoded._doc.username,
		url:checkedUrl,
		language: req.body.language,
		expiresAt: Number(date.getTime()) + Number(req.body.expiresAt)* 86400000
	})

	code.save(function(err, codeSaved){
		User.findOne({username: code.owner}, function(err, user){
			user.codes.push(code.header)
			user.save(function(err, headerSaved){
				console.log(codeSaved, headerSaved) ;
				var message  = 'Your code was successfully saved and live at /'+codeSaved.url ;
				res.render('add_new', {message: message})
			})
		})
	})
}
//