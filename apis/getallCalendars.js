
const calendar = require('../models/calendarSchema')

const getCalendarData = async (req, res) => {

    try {
        const data = await calendar.find()
        if (data) {
            res.send({
                result: true,
                message: "Data find successfully",
                data: data
            })
        }
        else {
            res.send({
                result: false,
                message: "No results for today",
            })
        }
        console.log(data)
    } catch (error) {
        console.log(error)
        res.status(401).send('Error to find calendars in db', error);
    }


}

module.exports = getCalendarData;

