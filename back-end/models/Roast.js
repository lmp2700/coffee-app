const mongoose = require('mongoose');
const {Schema} = mongoose;

const RoastSchema = new Schema({
    name: { type: String, required: true },
    color: { type: Number, required: true },
    origin: { type: String},
    description: { type: String },
    roaster: { type: Schema.Types.ObjectId, ref: "Roaster" },
    reviews: [{type: Schema.Types.ObjectId, ref: "RoastReview"}]
}, {
    timestamps: true
})
module.exports = mongoose.model("Roast", RoastSchema);