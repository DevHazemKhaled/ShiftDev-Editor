const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/editor', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'editor.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`[ShiftDev Cloud Core] Running on port ${PORT}`);
});
