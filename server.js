const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

const connectDB = require("./config/db")
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

// ROUTES

const hubRoutes = require("./routes/hubRoutes")
const pollRoutes = require("./routes/pollRoutes")
const analyticsRoutes = require("./routes/analyticsRoutes");


app.use("/api/hub", hubRoutes)
app.use("/api/polls", pollRoutes)
app.use("/api/analytics", analyticsRoutes)
app.use("/api/cases", require("./routes/caseRoutes"));
require("./utils/escalation");

// SERVER

const PORT = 5000

app.listen(PORT, () => {
 console.log("Server running on port", PORT)
})