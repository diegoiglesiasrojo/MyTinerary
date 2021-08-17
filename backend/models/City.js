const mongoose = require("mongoose")

const citySchema = new mongoose.Schema ({
    cityName: {type: String, required: true},
    cityImage: {type: String, required: true},
    cityCountry: {type: String, required: true},
    cityLanguage: {type: String, required: true},
    cityMoney: {type: String, required: true},
    cityFlag: {type: String, required: true},
    cityAirport: {type: Boolean, required: true},
    cityPort: {type: Boolean, required: true},
    cityTrainStation: {type: Boolean, required: true},
    cityUnderground: {type: Boolean, required: true}
})

const City = mongoose.model("city", citySchema)
module.exports = City