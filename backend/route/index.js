const express = require("express")
const router = express.Router()
const controllers = require("../controllers/controllers.js")

router.route("/cities")
.get(controllers.getCities)
.post(controllers.postCity)

router.route("/cities/:id")
.get(controllers.getCityById)
.delete(controllers.deleteCityById)
.put(controllers.putCityById)

module.exports = router