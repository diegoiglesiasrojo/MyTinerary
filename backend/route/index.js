const express = require("express")
const router = express.Router()
const controllers = require("../controllers/controllers.js")

router.route("/cities").get(controllers.getCities)

router.route("/cities/:id").get(controllers.getCityById)

module.exports = router
