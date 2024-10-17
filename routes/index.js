// const express = require('express')
const router = require('express').Router();
const validation = require('../middleware/validation');
const axios = require('axios');

const controller = require('../controllers/index');
router.use('/',require( './swagger'));
router.get('/', (req, res) => {
    res.send('Helloo World ')
});

router.get('/auth', (req, res) => {
    res.send(`
        <h1>Welcome to My App</h1>
        <a href="/oauth">
            <button>Log In with GitHub</button>
        </a>
    `);
});

router.get('/oauth', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT}&redirect_uri=http://localhost:8089/oauth-callback&scope=repo`)
});

// router.get('/oauth-callback', (req, res) => {
//     res.send('<button>Log Out </button>')
// });

// Handle the callback from GitHub
router.get('/oauth-callback', async (req, res) => {
    const code = req.query.code;

    // Exchange code for access token
    try {
        const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.GITHUB_CLIENT,
            client_secret: process.env.GITHUB_SECRET,
            code: code,
        }, {
            headers: {
                accept: 'application/json',
            },
        });

        const accessToken = tokenResponse.data.access_token;

        // Use the access token to fetch user data
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${accessToken}`,
            },
        });

        res.send(`Hello ${userResponse.data.login}, you are now authenticated!`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Authentication failed');
    }
});









router.get('/countries', controller.getAll);
router.get('/countries/:id', controller.getById);

router.post('/countries', validation.saveCountry, controller.createCountry);
router.put('/countries/:id', validation.saveCountry, controller.updateCountry);
router.delete('/countries/:id', controller.deleteCountry);

module.exports = router;