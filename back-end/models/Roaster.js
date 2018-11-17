const mongoose = require('mongoose');
const {Schema} = mongoose;

const RoasterSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
module.exports = mongoose.model("Roaster", RoasterSchema);