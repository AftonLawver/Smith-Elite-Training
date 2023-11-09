const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/html')));

mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;

db.on('error', ()=> {console.log("Error connecting to Database.")});
db.once('open', ()=> {console.log("Connected to Database.")});
app.post('/submit', (req, res) => {
    const data = req.body;

    db.collection('inquiries').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        else {
            console.log("Record inserted successfully.");
        }
    });
    return res.redirect('form_submission_success.html');
})


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

