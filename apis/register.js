const User = require('../models/authSchemas')
const bcrypt = require('bcrypt');


const userRegister = async (req, res) => {
    if (req.body.data) {
        try {
            const { password, username, email } = req.body.data;
            const userAlreadyExist = await User.findOne({ $or: [{ username }, { email }] });
            if (userAlreadyExist) {
                return res.status(409).send('User already exists');
            }
            if (password) {
                const saltRounds = 10;
                req.body.data.password = await bcrypt.hashSync(password, saltRounds);
            }
            const newUser = new User(req.body.data);
            await newUser.save();
            res.status(201).send('User Register successfully');
        } catch (err) {
            console.log("Error in register api", err)
            res.status(500).send('Error saving user');
        }
    } else {
        res.status(400).send('No user data provided');
    }
};



module.exports = userRegister;
