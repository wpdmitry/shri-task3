const express = require('express');

const router = express.Router();
const index = require('./controllers');

router.route('/').get(index);

// router.get('/', index);
// router.get('/meeting', index);

module.exports = router;
