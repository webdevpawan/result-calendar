const User = require('../models/authSchemas')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const login = async (req, res) => {

    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Password is incorrect' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });
        res.status(200).json({ username, token });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
}

module.exports = login
