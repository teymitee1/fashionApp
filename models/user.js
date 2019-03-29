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
    course:  {
        type: String,
        required: true,
    },
    age:  {
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
    payment_status:  {
        type: String,
    },
    reference:  {
        type: String,
    },
    gender:  {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("User", UserSchema);