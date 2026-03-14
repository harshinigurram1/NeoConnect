const mongoose = require("mongoose")

const HubPostSchema = new mongoose.Schema({

title:String,

summary:String,

type:String, // digest | impact | minutes

file:String,

createdAt:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("HubPost",HubPostSchema)