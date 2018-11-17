const mongoose = require('mongoose');
const {Schema} = mongoose;

const RoasterReviewSchema = new Schema({
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    roaster: {
        type: Schema.Types.ObjectId,
        ref: "Roaster"
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("RoasterReview", RoasterReviewSchema);