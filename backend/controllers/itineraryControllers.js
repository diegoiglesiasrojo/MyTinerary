const Itinerary = require("../models/Itinerary.js")

const itineraryControllers = {
    readAllItineraries: (req, res) => {
        Itinerary.find().populate("cityId")
        .then(itineraries => res.json({success: true, response: itineraries}))
        .catch(error => {
            res.json({success: false})
            console.error(error)
        })
    },
    readItineraryById: (req, res) => {
        Itinerary.findOne({_id: req.params.id})
        .then(itinerary => {
            if (itinerary) {
                res.json({success: true, response: itinerary})
            } else {
                throw new Error
            }
        })
        .catch(error => {
            res.json({success: false})
            console.error(error)
        })
    },
    readItineraryByCityId: (req, res) => {
        Itinerary.find({cityId: req.params.id})
        .then(itineraries => {
            res.json({success: true, response: itineraries})
        })
        .catch(error => {
            res.json({success: false})
            console.error(error)
        })
    },
    createItinerary: (req, res) => {
        const {publisherName, publisherSurname, publisherImage, title, 
            description, price, duration, likes, hashtags, comments, cityId
        } = req.body
        const itineraryToCreate = new Itinerary({
            publisherName,
            publisherSurname,
            publisherImage,
            title,
            description,
            price,
            duration,
            likes,
            hashtags,
            comments,
            cityId
        })
        itineraryToCreate.save()
        .then(() => res.json({ success: true }))
        .catch(error => {
            res.json({ success: false})
            console.error(error)
        })
    },
    deleteItineraryById: (req, res) => {
        Itinerary.findOneAndDelete({_id: req.params.id})
        .then( itinerary => {
            if(itinerary) {
                res.json({ success: true })
            } else {
                throw new Error
            }
        })
        .catch(error => {
            res.json({success: false})
            console.error(error)
        })
    },
    updateItineraryById: (req, res) => {
        Itinerary.findOneAndUpdate({_id: req.params.id}, {...req.body})
        .then( itinerary => {
            if(itinerary) {
                res.json({ success: true })
            } else {
                throw new Error
            }
        })
        .catch(error => {
            res.json({success: false})
            console.error(error)
        })
    },
    pushItineraryLikes: (req, res) => {
        Itinerary.findOneAndUpdate({_id: req.params.id}, {
            $push: {likes: req.body.mail}
        })
        .then( itinerary => {
            if(itinerary) {
                res.json({ success: true })
            } else {
                throw new Error
            }
        })
        .catch(error => {
            res.json({success: false})
            console.error(error)
        })
    },
    pullItineraryLikes: (req, res) => {
        Itinerary.findOneAndUpdate({_id: req.params.id}, {
            $pull: {likes: req.body.mail}
        })
        .then( itinerary => {
            if(itinerary) {
                res.json({ success: true })
            } else {
                throw new Error
            }
        })
        .catch(error => {
            res.json({success: false})
            console.error(error)
        })
    }
}

module.exports = itineraryControllers