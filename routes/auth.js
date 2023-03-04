const express = require('express');
const router = express.Router()
const User = require('../models/User');
const Cart = require('../models/Cart');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "$$$thisismyseckey$$$"


// Route 1: Create a user using: Post "/api/auth/". No Auth Required
router.post('/', async (req, res) => {
    const salt = await bcrypt.genSalt(10);

    const secPass = await bcrypt.hash(req.body.password, salt)

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
    }).then(user => {
        Cart.create({
            user:user.id
        }).then((cart)=>{
            const data = {
                user: {
                    id: user.id,
                    role:user.role
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            res.json({ authToken })

        })
    }).catch(error => {
        res.json({ error: "A user already registered with this email." })
    })
})



// Route 2 : Login a user using: Post "/api/auth/login". no Auth require
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password." })
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "Invalid email or password." })
        }
        const data = {
            user: {
                id: user.id,
                role:user.role
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({ authToken })
    } catch (error) {
        console.log(error);
        res.json({ error: "Internal Server Error" })
    }


})

// Route 3 : get loggedin user info using: Post "/api/auth/getUser". Auth require
router.post('/getUser', fetchuser, async (req, res) => {
    const { authToken } = req.body;
    try {
        const id = req.user.id
        let user = await User.findOne({ _id:id }).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error);
        res.json({ error: "Internal Server Error" })
    }


})

module.exports = router