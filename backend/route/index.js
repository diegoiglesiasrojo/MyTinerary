const express = require("express")
const router = express.Router()
const cityControllers = require("../controllers/cityControllers.js")
const itineraryControllers = require("../controllers/itineraryControllers.js")
const userControllers = require("../controllers/userControllers.js")

router.route("/cities")
.get(cityControllers.readCities)
.post(cityControllers.createCity)

router.route("/cities/:id")
.get(cityControllers.readCityById)
.delete(cityControllers.deleteCityById)
.put(cityControllers.updateCityById)

router.route("/itineraries")
.get(itineraryControllers.readAllItineraries)
.post(itineraryControllers.createItinerary)

router.route("/itineraries/:id")
.get(itineraryControllers.readItineraryByCityId)
.get(itineraryControllers.readItineraryById)
.delete(itineraryControllers.deleteItineraryById)
.put(itineraryControllers.updateItineraryById)

router.route("/user/account")
.post(userControllers.createAccount)

router.route("/user/account/:id")
.get(userControllers.readAccountById)
.put(userControllers.updateAccountById)
.delete(userControllers.deleteAccountById)

router.route("/user/logIn")
.post(userControllers.logIn)

module.exports = router