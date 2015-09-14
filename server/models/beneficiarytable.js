var mongoose = require('mongoose');
var BeneficiarytableSchema = require('../schemas/beneficiarytable');
var Beneficiarytable = mongoose.model('Beneficiarytable', BeneficiarytableSchema);

module.exports = Beneficiarytable;