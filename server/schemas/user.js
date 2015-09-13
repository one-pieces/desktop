var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name : {
		unique: true,
		type: String
	},
	password: String,
});

UserSchema.statics = {
	fetch: function(cb) {
		return this.find({}).exec(cb);
	},
	findById: function(id, cb) {
		return this.findOne({_id: id}).exec(cb);
	}
}

module.exports = UserSchema;