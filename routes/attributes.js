const express = require('express');
const router = express.Router()
const Attributes = require('../models/Attributes');
const User = require('../models/User');
const fetchuser = require("../middleware/fetchuser")
const constants = require("../Constant")


// Route 1: Create a attributes using: Post "/api/attributes/". Auth Required => { type,name,slug }
router.post('/', fetchuser(constants.Attributes), async (req, res) => {
    
    const { type,name,slug } = req.body;

    Attributes.create({
        type,name,slug
    }).then((attributes) => {
        res.json(attributes)
    }).catch((error) => {
        res.json({ error: error })
    })
    
})

// Route 2: get Attributes using: Get "/api/post/". No Auth Required {slug:attribute}
router.get('/', async (req, res) => {
    Attributes.findOne({
        slug: req.body.slug
    }).populate("term").then((attributes) => {
        res.json(attributes)
    })

})
module.exports = router