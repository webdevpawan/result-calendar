const express = require('express');
const Register = require('../apis/register')
const login = require('../apis/login')
const getCalendarData = require('../apis/getallCalendars')
const storeCalendarData = require('../apis/storeCalendarData')

const router = express.Router();


router.post('/register', Register)
router.post('/login', login)
router.get('/calendar', getCalendarData)
router.get('/selfcall', storeCalendarData)


module.exports = router;
