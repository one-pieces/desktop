var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BeneficiarySchema = new Schema({
	name : String,
	sex: String,
	age: Number,
	birthdate: Date,
	proportion: Number,
	groupIndex: Number,
	rowIndex: Number
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