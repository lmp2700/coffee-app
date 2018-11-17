const mongoose = require('mongoose');
const {Schema} = mongoose;

const RoastSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    roaster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roaster"
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("Roast", RoastSchema);