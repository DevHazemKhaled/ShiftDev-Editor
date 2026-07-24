const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// قراءة شجرة الملفات والمجلدات
router.get('/tree', (req, res) => {
    const projectPath = path.join(__dirname, '../../');
    try {
        const files = fs.readdirSync(projectPath);
        res.json({ success: true, files });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// قراءة محتوى ملف معين
router.get('/read', (req, res) => {
    const filePath = req.query.path;
    if (!filePath) return res.status(400).json({ error: 'Missing file path' });

    try {
        const content = fs.readFileSync(path.join(__dirname, '../../', filePath), 'utf8');
        res.json({ success: true, content });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
