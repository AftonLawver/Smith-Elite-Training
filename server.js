const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT;
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/html')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/index.html'));
})

app.listen(PORT, err => {
    if (err) {
        console.log("ERROR", err);
    }
    else {
        console.log(`Server started on port ${PORT}`);
    }
})

