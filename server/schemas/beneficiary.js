var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BeneficiarySchema = new Schema({
	name : {
		unique: true,
		type: String
	},
	sex: String,
	age: Number,
	birthdate: String,
	abortion: String
});

BeneficiarySchema.statics = {
	fetch: function(cb) {
		return this.find({}).exec(cb);
	},
	findById: function(id, cb) {
		return this.findOne({_id: id}).exec(cb);
	}
}

module.exports = BeneficiarySchema;