const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const {Schema} = mongoose;

const RoasterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    googleId: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
})
RoasterSchema.plugin(findOrCreate, {upsert: true});
module.exports = mongoose.model("Roaster", RoasterSchema);