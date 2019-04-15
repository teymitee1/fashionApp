var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname:  {
        type: String,
        required: true,
    },
    phone:  {
        type: String,
        required: true, 
    },
    email:  {
        type: String,
        required: true,
        unique: true,
    },
    age:  {
        type: String,
        required: true,
    },
    gender:  {
        type: String,
        required: true,
    },
    occupation:  {
        type: String,
        required: true,
    },
    facilitator:  {
        type: String,
        required: true,
    },
    course:  {
        type: String,
        required: true,
    },
    state:  {
        type: String,
        required: true,
    },
    business:  {
        type: String,
    },
    amount:  {
        type: String,
    },
    payment_status: {
        type: String,
    },
    reference:  {
        type: String,
    }
    
});

module.exports = mongoose.model("User", UserSchema);