const mongoose = require('mongoose');
const { Schema } = mongoose;

const TermsSchema = new Schema({

    type:{
        type: String,
        requires: true
    },
    name: {
        type: String,
        requires: true
    },
    value: {
        type: String,
        requires: true
    },
    slug: {
        type: String,
        requires: true,
        unique: true
    },
    attribute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "attribute",
        requires: true
    }


}, { timestamps: true })
const terms = mongoose.model('term', TermsSchema);
terms.createIndexes()

module.exports = terms