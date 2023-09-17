// Create web server

// Import modules
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

// Set up body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set up static files
app.use(express.static(path.join(__dirname, 'public')));

// Get comments
app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.send(data);
        }
    });
});

// Post comments
app.post('/comments', (req, res) => {
    fs.readFile('./comments.json', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send('Comment posted!');
                }
            });
        }
    });
});

// Run server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});