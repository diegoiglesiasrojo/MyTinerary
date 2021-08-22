const mongoose = require("mongoose")

const itinerarySchema = new mongoose.Schema ({
    itineraryPublisherName: {type: String, required: true},
    itineraryPublisherSurname: {type: String, required: true},
    itineraryPublisherImage: {type: String, required: true},
    itineraryTitle: {type: String, required: true},
    itineraryDescription: {type: String, required: true},
    itineraryPrice: {type: Number, required: true},
    itineraryDuration: {type: Number, required: true},
    itineraryLikes: {type: Number, required: true, default: 0},
    itineraryHashtags: {type: Array, required: true},
    itineraryComments: {type: Array, required: true},
    cityId: {type: mongoose.Types.ObjectId, ref: "city", required: true}
})

const Itinerary = mongoose.model("itinerary", itinerarySchema)
module.exports = Itinerary