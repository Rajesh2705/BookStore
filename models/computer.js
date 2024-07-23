const mongoose = require('mongoose');

const computerSchema = new mongoose.Schema({
    serialNumber: { type: String, required: true, unique: true},
    brand: { type: String, required: true},
    model: {type: String, required: true},
    avaliable: {type: Boolean, default: true}
});

module.exports = mongoose.model('Computer', computerSchema);