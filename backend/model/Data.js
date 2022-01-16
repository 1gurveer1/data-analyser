const mongoose = require('mongoose');
const { Schema } = mongoose;

const DataSchema = new Schema({
    temp:{
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    pressure: {
        type: Number,
        default: "General"
    },
    date: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model('data', DataSchema);