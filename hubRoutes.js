const router = require("express").Router()
const HubPost = require("../models/HubPost")

// Get all posts

router.get("/", async(req,res)=>{

const posts = await HubPost.find()

res.json(posts)

})

module.exports = router