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
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("RoastReview", RoastReviewSchema);