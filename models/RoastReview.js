const mongoose = require('mongoose');
const {Schema} = mongoose;

const RoastReviewSchema = new Schema({
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    roast: {
        type: Schema.Types.ObjectId,
        ref: "Roast"
    },
    // title: {
    //     type: String,
    //     required: true
    // },
    body: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        max: 5,
        min: 1,
        required: true
    },
    flavors: [{type: String}]
}, {
    timestamps: true
})
module.exports = mongoose.model("RoastReview", RoastReviewSchema);