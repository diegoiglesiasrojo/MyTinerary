const mongoose = require("mongoose")

const citySchema = new mongoose.Schema ({
    cityName: {type: String, required: true},
    cityImage: {type: String},
})

const City = mongoose.model("city", citySchema)
module.exports = City