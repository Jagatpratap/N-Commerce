const express = require('express');
const router = express.Router()
const Cart = require('../models/Cart');
const User = require('../models/User');
const fetchuser = require("../middleware/fetchuser");




// Route 1: Get a cart using: Get "/api/cart/". Auth Required
router.get('/', fetchuser, async (req, res) => {
    Cart.findOne({ user: req.user.id }).then((cart) => {
        res.json(cart)
    })
})

// Route 2: add item to cart using: Post "/api/cart/". Auth Required
router.post('/', fetchuser, async (req, res) => {
    const { item, quantity } = req.body;

    Cart.findOne({ user: req.user.id }).populate("user").then((cart) => {

        let newCart = []
        let updated = false

        cart.products.forEach(product => {
            if (product.product == item) {
                updated = true
                newCart.push({ product: item, quantity: product.quantity + quantity })
            }
            else {
                newCart.push(product)
            }
        })
        if (!updated) {
            newCart.push({ product: item, quantity })
        }
        // console.log(newCart,cart);
        Cart.findOneAndUpdate({ user: req.user.id }, { products: newCart }, { new: true, useFindAndModify: false }).then((cart) => {
            res.json(cart)
        }).catch((error) => {
            res.json({ error: error })
        })

    })

})

// Route 3: Update a cart using: put "/api/cart/". Auth Required
router.put('/', fetchuser, async (req, res) => {
    const { products } = req.body;

    Cart.findOneAndUpdate({ user: req.user.id },{products})
})


module.exports = router