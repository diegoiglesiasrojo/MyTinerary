const mongoose = require("mongoose")

const activitySchema = new mongoose.Schema ({
    activities: {type: Array, required: true},
    itineraryId: {type: mongoose.Types.ObjectId, ref: "itinerary", required: true}
})

const Activity = mongoose.model("activity", activitySchema)
module.exports = Activity