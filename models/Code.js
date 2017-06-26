var mongoose = require('mongoose') ;
var Schema = mongoose.Schema ;

module.exports = mongoose.model('notice', new Schema({
	header:String,
	content: String,
	type: String,
	owner: String
}))