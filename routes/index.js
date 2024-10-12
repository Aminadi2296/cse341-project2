// const express = require('express')
const router = require('express').Router();
const validation = require('../middleware/validation');

const controller = require('../controllers/index');
router.use('/',require( './swagger'));
router.get('/', (req, res) => {
    res.send('Helloo World')
});

router.get('/countries', controller.getAll);
router.get('/countries/:id', controller.getById);

router.post('/countries', validation.saveCountry, controller.createCountry);
router.put('/countries/:id', validation.saveCountry, controller.updateCountry);
router.delete('/countries/:id', controller.deleteCountry);

module.exports = router;