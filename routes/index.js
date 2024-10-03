const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Helloo World')
});

module.exports = router;