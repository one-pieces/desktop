var mongoose = require('mongoose');
var BeneficiarySchema = require('../schemas/beneficiary');
var Beneficiary = mongoose.model('Beneficiary', BeneficiarySchema);

module.exports = Beneficiary;