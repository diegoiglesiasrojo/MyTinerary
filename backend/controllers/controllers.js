const City = require("../models/City.js")

const controllers = {
    getCities: (req, res) => {
        City.find()
        .then(cities => res.json({success: true, response: cities}))
        .catch(error => {
            res.json({success: false})
            console.error(error)
        })
    },
    getCityById: (req, res) => {
        City.findOne({_id: req.params.id})
        .then(city => res.json({success: true, response: city}))
        .catch(error => {
            res.json({success: false})
            console.error(error)
        })
    },
    postCity: (req, res) => {
        const cityToPost = new City({
            cityName: req.body.cityName,
            cityImage: req.body.cityImage,
        })
        cityToPost.save()
        .then(() => res.json({ success: true }))
        .catch(error => {
            res.json({ success: false})
            console.error(error)
        })
    },
    deleteCityById: (req, res) => {
        City.findOneAndDelete({_id: req.params.id})
        .then(() => res.json({ success: true }))
        .catch(error => {
            res.json({success: false})
            console.error(error)
        })
    },
    putCityById: (req, res) => {
        City.findOneAndUpdate({_id: req.params.id}, {...req.body})
        .then(() => res.json({ success: true }))
        .catch(error => {
            res.json({success: false})
            console.error(error)
        })
    }
}

module.exports = controllers