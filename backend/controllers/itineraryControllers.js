const Itinerary = require("../models/Itinerary.js")

const itineraryControllers = {
    readAllItineraries: (req, res) => {
        Itinerary.find()
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
    createItinerary: (req, res) => {
        const itineraryToCreate = new Itinerary({
            itineraryPublisherName: req.body.itineraryPublisherName,
            itineraryPublisherSurname: req.body.itineraryPublisherSurname,
            itineraryPublisherImage: req.body.itineraryPublisherImage,
            itineraryTitle: req.body.itineraryTitle,
            itineraryDescription: req.body.itineraryDescription,
            itineraryPrice: req.body.itineraryPrice,
            itineraryDuration: req.body.itineraryDuration,
            itineraryLikes: req.body.itineraryLikes,
            itineraryHashtags: req.body.itineraryHashtags,
            itineraryComments: req.body.itineraryComments,
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
    } 
}

module.exports = itineraryControllers