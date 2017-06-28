var mongoose = require('mongoose') ;
var Schema = mongoose.Schema ;

module.exports = mongoose.model('code', new Schema({
	header:String,
	content: String,
	type: String,
	owner: String,
	url: String,
	language: String,
	expiresAt: Number
}))