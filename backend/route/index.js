const express = require("express")
const router = express.Router()
const cityControllers = require("../controllers/cityControllers.js")
const itineraryControllers = require("../controllers/itineraryControllers.js")
const userControllers = require("../controllers/userControllers.js")
// const passport = require("passport")
const validator = require("../controllers/validator.js")

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
.post(validator, userControllers.createAccount)

// router.route("/user/account/:id")
// .put(passport.authenticate("jwt", {session: false}), userControllers.updateAccountById)
// .delete(passport.authenticate("jwt", {session: false}), userControllers.deleteAccountById)

router.route("/user/logIn")
.post(userControllers.logIn)

module.exports = router