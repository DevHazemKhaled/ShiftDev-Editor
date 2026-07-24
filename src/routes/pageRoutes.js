const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/editor', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/editor.html'));
});

router.get('/settings', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/settings.html'));
});

module.exports = router;
