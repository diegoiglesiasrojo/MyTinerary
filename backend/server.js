const express = require("express")
const cors = require("cors")
const router = require("./route/index.js")
require("dotenv").config()
require("./config/database.js")
const passport = require("passport")
require("./config/userPassport.js")
require("./config/activityPassport.js")
require("./config/itineraryPassport.js")

const app = express()

app.listen(4000, () => console.log("Server created successfully on port 4000"))
app.use(cors())
app.use(express.json())

app.use("/api", router)