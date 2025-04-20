const express = require('express');
const router = express.Router();
const { saveMessage, getMessages } = require('../controllers/usercontroller');

router.post('/save', saveMessage);
router.post('/get', getMessages);

module.exports = router;
