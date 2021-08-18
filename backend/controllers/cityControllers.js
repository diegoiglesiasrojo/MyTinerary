const City = require("../models/City.js")

const cityControllers = {
    readCities: (req, res) => {
        City.find()
        .then(cities => res.json({success: true, response: cities}))
        .catch(error => {
            res.json({success: false})
            console.error(error)
        })
    },
    readCityById: (req, res) => {
        City.findOne({_id: req.params.id})
        .then(city => {
            if (city) {
                res.json({success: true, response: city})
            } else {
                throw new Error
            }
        })
        .catch(error => {
            res.json({success: false})
            console.error(error)
        })
    },
    createCity: (req, res) => {
        const cityToPost = new City({
            cityName: req.body.cityName,
            cityImage: req.body.cityImage,
            cityCountry: req.body.cityCountry,
            cityLanguage: req.body.cityLanguage,
            cityMoney: req.body.cityMoney,
            cityFlag: req.body.cityFlag,
            cityAirport: req.body.cityAirport,
            cityPort: req.body.cityPort,
            cityTrainStation: req.body.cityTrainStation,
            cityUnderground: req.body.cityUnderground      
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
        .then( city => {
            if(city) {
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
    updateCityById: (req, res) => {
        City.findOneAndUpdate({_id: req.params.id}, {...req.body})
        .then( city => {
            if(city) {
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

module.exports = cityControllers