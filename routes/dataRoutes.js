// routes/dataRoutes.js
const express = require('express');
const router = express.Router();
const { previewData } = require('../controllers/dataController');

router.get('/preview', previewData);

module.exports = router;