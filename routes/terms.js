const express = require('express');
const router = express.Router()
const Terms = require('../models/Terms');
const Attributes = require('../models/Attributes');

const User = require('../models/User');
const fetchuser = require("../middleware/fetchuser")
const constants = require("../Constant")


// Route 1: Create a Terms using: Post "/api/Terms/". Auth Required => {name, slug, value, attributes }
router.post('/', fetchuser(constants.Attributes), async (req, res) => {

    const { name, slug, value, attributes} = req.body;

    Terms.create({
        name, slug, value, attributes
    }).then((terms) => {
        Attributes.findByIdAndUpdate(
            { _id: attributes },
            { $push: { terms: terms.id } },
            { new: true, useFindAndModify: false }
        ).then((attribute) => {
            res.json({terms, attribute})
        }).catch((error) => {
            res.json({ error: error })
        })
    }).catch((error) => {
        res.json({ error: error })
    })

})

// Route 2: get Terms using: Get "/api/post/". No Auth Required {slug:attribute}
router.get('/', async (req, res) => {
    Attributes.findOne({
        slug: req.body.slug
    }).populate().then((attributes) => {
        res.json(attributes)
    })

})
module.exports = router





