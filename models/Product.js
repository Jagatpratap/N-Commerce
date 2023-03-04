const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    status: {
        type: String,
        enum: ["Published", "Draft"],
        default: "Published"
    },
    title: {
        type: String,
        requires: true
    },
    slug: {
        type: String,
        requires: true,
        unique: true
    },
    excerpt: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: String,
        requires: true,
    },
    salePrice: {
        type: String,
    },
    averageRating: {
        type: String
    },
    totalRates: {
        type: Number
    },
    featuredImage: {
        type: String
    },
    images: [
        { type: String }
    ],
    featured: {
        type: Boolean,
        default: false
    },
    attributes: [
        {
            attribute: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "attribute"
            },
            terms: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "term"
                }
            ]
        }
    ]




}, { timestamps: true })
const product = mongoose.model('product', ProductSchema);
product.createIndexes()

module.exports = product