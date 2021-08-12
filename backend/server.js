const express = require("express")
const cors = require("cors")

const app = express()

app.listen(4000, () => console.log("Server created successfully on port 4000"))
app.use(cors())
app.use(express.json())