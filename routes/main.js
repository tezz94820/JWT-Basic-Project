const express = require('express');
const router = express.Router();
const { login , dashboard } = require('../controllers/main.js')
const authMiddleware = require('../middleware/auth.js')

router.route('/dashboard').get( authMiddleware , dashboard)     //before going to dashboard middleware the authentication will be done in the authMiddleware
router.route('/login').post(login)


module.exports = router
