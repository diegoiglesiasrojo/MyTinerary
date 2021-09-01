const Activity = require("../models/Activity.js")

const activityControllers = {
    readActivityByItineraryId: (req, res) => {
        Activity.find({itineraryId: req.params.id})
        .then(activity => {
            if(activity.length !== 0) {
                res.json({success: true, response: activity})
            } else {
                res.json({success: false, error: "There are not activities to see"})
            }
        })
        .catch(error => {
            res.json({success: false, error: "Fail to connect with the database"})
            console.error(error)
        })
    },
    createActivity: (req, res) => {
        const {activities, itineraryId} = req.body
        const activityToCreate = new Activity({
            activities, itineraryId
        })
        activityToCreate.save()
        .then(() => res.json({ success: true }))
        .catch(error => {
            res.json({ success: false})
            console.error(error)
        })
    }
}

module.exports = activityControllers