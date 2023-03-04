const express = require('express');
const router = express.Router()
const Product = require('../models/Product');
const User = require('../models/User');
const fetchuser = require("../middleware/fetchuser")
const constants = require("../Constant")




// Route 1: Get a product using: Get "/api/product/". No Auth Required
router.get('/', async (req, res) => {
    Product.findOne({
        slug: req.body.slug
    }).populate("attribute").then((product) => {
        res.json(product)
    })
})

// Route 2: Create a product using: Post "/api/product/". Auth Required
router.post('/', fetchuser(constants.Product), async (req, res) => {
    const { title, slug, excerpt, description, featuredImage, images, featured, averageRatting, totalRates, price, salePrice, attributes } = req.body;

    Product.create({
        title, slug, excerpt, description, featuredImage, images, featured, averageRatting, totalRates, price, salePrice, attributes
    }).then((product) => {
        res.json(product)
    }).catch((error) => {
        res.json({ error: error })
    })
})

// Route 3: Update a product using: put "/api/product/". Auth Required
router.put('/', fetchuser(constants.Product), async (req, res) => {
    const { title, excerpt, description, featuredImage, images, featured, averageRatting, totalRates, price, salePrice, _id } = req.body;

    Product.findByIdAndUpdate(_id, {
        title, excerpt, description, featuredImage, images, featured, averageRatting, totalRates, price, salePrice
    }, { new: true, useFindAndModify: false }).then((product) => {
        res.json(product)
    }).catch((error) => {
        res.json({ error: error })
    })
})


module.exports = router