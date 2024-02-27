const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/authRoutes')
const bodyParser = require('body-parser');
const cors = require('cors')
const serverless = require('serverless-http');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())



mongoose.connect(process.env.MONGO_URL)
    .then(() => {

        console.log("Connected to MongoDB Atlas");
        app.use('/api', authRoutes)

        app.get('/', (req, res) => {
            res.send("Hello, world!")
        })

        app.listen(process.env.PORT, () => {
            console.log('Server listening on port  3000');
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB Atlas: ", error);
    });

const handler = serverless(app);
module.exports = handler;
