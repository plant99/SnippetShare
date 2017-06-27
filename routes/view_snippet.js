var express = require('express') 
var router = express.Router()

router.get('/:id',function(req, res, next){
	Code.findOne({url:req.params.id},function(err, snippet){
		if(snippet){
			if(snippet.type === 'public'){
				res.render('view_snippet', {snippet, message:''})
			}else{
				next() ;
			}
		}else{
			res.render('error',{message:'The snippet doesn\'t exist'})
		}
	})
})


module.exports = router ;