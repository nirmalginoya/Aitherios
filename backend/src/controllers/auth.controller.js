const authService = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const result = await authService.register({ firstName, lastName, email, password });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const getMe = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login, getMe };