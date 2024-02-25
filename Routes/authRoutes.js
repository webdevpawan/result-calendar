const express = require('express');
const Register = require('../apis/register')
const login = require('../apis/login')
const getCalendarData = require('../apis/getallCalendars')

const router = express.Router();

router.post('/register', Register)
router.post('/login', login)
router.get('/calendar', getCalendarData)



module.exports = router;
