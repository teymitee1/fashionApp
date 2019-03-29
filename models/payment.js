// Activity Model
var mongoose = require("mongoose");

var PaymentSchema = new mongoose.Schema({
    text: String
})

module.exports = mongoose.model("Payment", PaymentSchema);
