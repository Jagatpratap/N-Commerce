const express = require('express');
const router = express.Router()
const Post = require('../models/Post');
const User = require('../models/User');
const fetchuser = require("../middleware/fetchuser")
const constants = require("../Constant")

// Route 1: Create a post using: Post "/api/post/". Auth Required
router.post('/', fetchuser(constants.Post), async (req, res) => {
    const { title, slug, excerpt, description, featuredImage, image } = req.body;

    Post.create({
        title, slug, excerpt, description, featuredImage, image, user: req.user.id
    }).then((post) => {
        User.findByIdAndUpdate(
            req.user.id,
            { $push: { posts: post.id } },
            { new: true, useFindAndModify: false }
        ).then(() => {
            res.json({ post })
        })
    }).catch((error) => {
        res.json({ error: error })
    })
})

// Route 1: Create a post using: Get "/api/post/". No Auth Required
router.get('/', async (req, res) => {
    Post.findOne({
        slug: req.body.slug
    }).populate("user",["name","email","posts"]).select("").then((post) => {
        res.json(post)
    })

})
module.exports = router