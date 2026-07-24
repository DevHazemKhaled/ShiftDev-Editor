const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

// تقديم الملفات الثابتة من مجلد public
app.use(express.static(path.join(__dirname, 'public')));

// مسارات التنقل للصفحات المتعددة
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/editor', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'editor.html'));
});

app.get('/settings', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'settings.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`[ShiftDev Cloud Studio] Running smoothly on port ${PORT}`);
});
