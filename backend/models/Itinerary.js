const mongoose = require("mongoose")

const itinerarySchema = new mongoose.Schema ({
    publisherName: {type: String, required: true},
    publisherSurname: {type: String, required: true},
    publisherImage: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    duration: {type: Number, required: true},
    likes: {type: Array, required: true},
    hashtags: {type: Array, required: true},
    comments: {type: Array, required: true},
    cityId: {type: mongoose.Types.ObjectId, ref: "city", required: true}
})

const Itinerary = mongoose.model("itinerary", itinerarySchema)
module.exports = Itinerary