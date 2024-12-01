const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api'); // Assuming your API routes are in a separate file
const trainRoutes = require('./routes/train.routes'); // Import train routes

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure session middleware
app.use(session({
    secret: 'your-secret-key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 60 * 1000 } // 10 minutes
}));

// Middleware to check session expiration
app.use((req, res, next) => {
    if (req.session) {
        if (Date.now() > req.session.cookie.expires) {
            req.session.destroy((err) => {
                if (err) {
                    return next(err);
                }
                return res.status(401).send('Session expired. Please log in again.');
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

// Use API routes
app.use('/api', apiRoutes);
app.use('/api', trainRoutes); // Use train routes

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});