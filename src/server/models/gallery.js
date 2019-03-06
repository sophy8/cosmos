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
        to: {
            type: String,
            required: true
        },
        description: {
            type: String        }
    });

/* Export model for application usage */
module.exports = mongoose.model('Gallery', GallerySchema);
