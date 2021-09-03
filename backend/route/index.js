const express = require("express")
const router = express.Router()
const passport = require("passport")
const cityControllers = require("../controllers/cityControllers.js")
const itineraryControllers = require("../controllers/itineraryControllers.js")
const userControllers = require("../controllers/userControllers.js")
const activityControllers = require("../controllers/activityControllers.js")
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
.delete(itineraryControllers.deleteItineraryById)
.put(itineraryControllers.updateItineraryById)

router.route("/itineraries/pushLikes/:id")
.put(passport.authenticate("jwt", {session: false}), itineraryControllers.pushItineraryLikes)

router.route("/itineraries/pullLikes/:id")
.put(passport.authenticate("jwt", {session: false}), itineraryControllers.pullItineraryLikes)

router.route("/itineraries/pushComments/:id")
.put(passport.authenticate("jwt", {session: false}), itineraryControllers.pushItineraryComments)

router.route("/itineraries/pullComments/:id")
.put(passport.authenticate("jwt", {session: false}), itineraryControllers.pullItineraryComments)

router.route("/itineraries/setComments/:id")
.put(passport.authenticate("jwt", {session: false}), itineraryControllers.setItineraryComments)

router.route("/user/account")
.post(validator, userControllers.createAccount)

router.route("/user/account/:id")
.put(passport.authenticate("jwt", {session: false}), userControllers.updateAccountById)
.delete(passport.authenticate("jwt", {session: false}), userControllers.deleteAccountById)

router.route("/user/logIn")
.post(userControllers.logIn)

router.route("/user/comments/:id")
.get(userControllers.readUserById)

router.route("/activities")
.post(activityControllers.createActivity)

router.route("/activities/:id")
.get(activityControllers.readActivityByItineraryId)

module.exports = router