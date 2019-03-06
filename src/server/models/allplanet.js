
var monoose = require('mongoose');
var Shema= monoose.Schema;

PlanetShema = new Shema({});
module.exports = mongoose.model('Planet', PlanetSchema);
