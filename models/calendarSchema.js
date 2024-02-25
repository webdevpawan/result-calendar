const mongoose = require('mongoose');


const calendarSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    resultType: { type: String, required: true },
    time: { type: String, required: true },
    ltp: { type: String, required: true },
    percentChg: { type: String, required: true },
}, { timestamps: true });


const calendar = mongoose.model('calendar', calendarSchema);

module.exports = calendar;
