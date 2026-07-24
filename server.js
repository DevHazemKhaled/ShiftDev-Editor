const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes mapping
const pageRoutes = require('./src/routes/pageRoutes');
app.use('/', pageRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`[ShiftDev Cloud Studio Engine] System operational on port ${PORT}`);
});
