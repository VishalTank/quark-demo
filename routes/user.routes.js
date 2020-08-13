const express = require('express');

const { createUser, loginUser, getUser } = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

const router = new express.Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/me', auth, getUser);

module.exports = router;
