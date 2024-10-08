// const express = require('express')
const router = require('express').Router();

const controller = require('../controllers/index');

router.get('/', (req, res) => {
    res.send('Helloo World')
});

router.get('/countries', controller.getAll);
router.get('/countries/:id', controller.getById);

router.post('/countries', controller.createCountry);
router.put('/countries', controller.updateCountry);
router.delete('/countries/:id', controller.deleteCountry);

module.exports = router;