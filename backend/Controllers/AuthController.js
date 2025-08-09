const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user= await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exists",sucess: false });
        }

        const userModel = new UserModel({
            name,
            email,
            password
        });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        return res.status(201).json({ message: "User registered successfully", success: true });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

const login = async (req, res) => {
    try {
        const {email, password } = req.body;
        const user= await UserModel.findOne({ email });
        const errorMsg = "Please enter valid email and password";
        if (!user) {
            return res.status(403).json({ errorMsg ,sucess: false });
        }
        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(403).json({ errorMsg, success: false });
        }
        // Generate JWT token
        const jwtToken = jwt.sign({email:user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: "Login Sucess", success: true, token: jwtToken,email:user.email,name:user.name });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

module.exports = {
    register,
    login
};