const user = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Login = async (req, res) => {

    const { email, password } = req.body;


    let existingUser;
    try {
        existingUser = await user.findOne({ email: email });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'internal server error ', data: error });
    }

    if (!existingUser) {
        return res.status(200).json({ success: false, message: 'Email donst exist!!', data: null });
    }

    const compare = await bcrypt.compare(password, existingUser.password);  // true// false

    if (!compare) {
        return res.status(200).json({ success: false, message: 'Check Your Password', data: null });
    }
    console.log('====================================');
    console.log(process.env.JWT_SECRET);
    console.log('====================================');
    // Create JWT token
    const token = jwt.sign({ userId: existingUser._id, email: existingUser.email, username: existingUser.name, role: existingUser.role }, process.env.JWT_SECRET, {
        expiresIn: '1h' // Token expires in 1 minute
    });

    return res.status(200).json({ success: true, message: `Logged Successfully, Welcome Mr/Miss/Mrs ${existingUser.name}`, data: existingUser, token });

}

const Logout = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'Authorization header not found', data: null });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.decode(token);

    // Add the token to the blacklist
    tokenBlacklist.push(token);

    return res.status(200).json({ success: true, message: 'Logout successful', data: null });
};

module.exports = {
    Login,
    Logout,
};