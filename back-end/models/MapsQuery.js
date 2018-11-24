const mongoose = require('mongoose');
const {Schema} = mongoose;
const findOrCreate = require('mongoose-findorcreate');

const MapsQuerySchema = new Schema({
    query: {type: String, required: true},
    location: {type: String},
}, {
    timestamps: true
})
MapsQuerySchema.plugin(findOrCreate, {upsert: true});
module.exports = mongoose.model("MapsQuery", MapsQuerySchema);