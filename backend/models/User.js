const mongoose = require("mongoose")

const userSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    image: {type: String, required: true},
    country: {type: String, required: true},
    mail: {type: String, required: true},
    password: {type: String, required: true},
    admin: {type: Boolean, default: false},
    google: {type: Boolean, default: false}
})

const User = mongoose.model("user", userSchema)
module.exports = User