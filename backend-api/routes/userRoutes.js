const express = require('express');
const router = express.Router();
const { registerUser, getAllUsers } = require('../controllers/userController');

router.post('/register', registerUser);
router.get('/users', getAllUsers); // new route to fetch users

module.exports = router;
