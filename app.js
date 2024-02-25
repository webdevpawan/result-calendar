const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/authRoutes')
const bodyParser = require('body-parser');
const cron = require('node-cron');
const storeCalendarData = require('./apis/storeCalendarData')
var cors = require('cors')

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())



mongoose.connect(process.env.MONGO_URL)
    .then(() => {

        console.log("Connected to MongoDB Atlas");
        app.use('/api', authRoutes)

        cron.schedule('30 9 * * *', storeCalendarData);
        cron.schedule('00 15 * * *', storeCalendarData);


        app.listen(process.env.PORT, () => {
            console.log('Server listening on port  3000');
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB Atlas: ", error);
    });

