
var mongoose = require('mongoose'),
    Schema= mongoose.Schema;

PlanetSchema = new Schema({
    id:{
        type:Number
    },
    name: {
        type: String,
        required: true,
        max: 50
    }
});
module.exports = mongoose.model('Planet', PlanetSchema);
