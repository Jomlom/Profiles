const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(express.static('Client'));
app.use(bodyParser.json());

app.post('/save', (req, res) => {
    const inputData = req.body;
    fs.writeFile('data.json', JSON.stringify(inputData, null, 2), (err) => {
        if (err) {
            res.status(500).send('Error saving data');
        } else {
            res.send('Data saved successfully');
        }
    });
});

app.listen(8090, () => {
    console.log('Server is running on port 8090');
});