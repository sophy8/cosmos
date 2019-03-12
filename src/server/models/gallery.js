/* Import the Mongoose software module */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    /* Define the schema rules (field names, types and rules) */
    GallerySchema = new Schema({
        id:{
            type:Number
        },
        from: {
            type: String,
            required: true,
            max: 50
        },
        port:{
            type: Array,
            required: true
        },
        date:{
          type: Date, default: Date.now 
        },
        to: {
            type: String,
            required: true
        },
        multicity: {
            type: Boolean
        },
        description: {
            type: String        }
    });

/* Export model for application usage */
module.exports = mongoose.model('Gallery', GallerySchema);
