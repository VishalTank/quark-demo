const express = require('express');

const auth = require('../middlewares/auth.middleware');
const { sample } = require('../controllers/docs.controller');

const router = new express.Router();

router.post('/upload', sample);

module.exports = router;
