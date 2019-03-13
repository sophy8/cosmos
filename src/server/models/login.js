var mongoose = require('mongoose'),
    Schema = mongoose.Schema,

    /* Define the schema rules (field names, types and rules) */
    LoginSchema = new Schema({
     email:{
        type: String,
        unique: true,
        required: true,
        trim: true
     },
     password:{
        type: String,
        required: true,
     }
    });

/* Export model for application usage */
module.exports = mongoose.model('Login', LoginSchema);