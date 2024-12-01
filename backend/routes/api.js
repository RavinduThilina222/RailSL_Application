
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Assuming you use bcrypt for password hashing
const { User } = require('../models'); // Assuming you have a User model

router.post('/user/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).send('Invalid username or password.');
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid username or password.');
        }
        req.session.user = { id: user.id, role: user.role, username: user.username };
        res.send({ role: user.role, token: 'dummy-token' }); // Replace with actual token generation logic
    } catch (error) {
        res.status(500).send('An error occurred. Please try again later.');
    }
});

router.post('/admin/login', async (req, res) => {
    // Similar to user login but for admin
    // ...existing code...
});

module.exports = router;