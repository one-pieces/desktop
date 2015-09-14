var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var BeneficiarytableSchema = new Schema({
	// id: {
	// 	unique: true,
	// 	type: String
	// },
	groupNumber: Number,
	groups: [{
		// id: String,
		proportion: Number,
		rows: [{
			// id: String,
			beneficiary: {type: ObjectId, ref: 'Beneficiary'}
		}]
	}]
});

BeneficiarytableSchema.statics = {
	fetch: function(cb) {
		return this.find({}).exec(cb);
	},
	findById: function(id, cb) {
		return this.findOne({_id: id}).exec(cb);
	}
}

module.exports = BeneficiarytableSchema;