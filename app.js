const express = require('express');
const moment = require('moment');
const fs = require('fs');

//Create server
const app = express();
//Port
const port = 8080;

app.get('/', (req, res) => {
    //Read resources from file
    fs.readFile('resources/response.json', (err, data) => {
        if (err) throw err;
        let resource = JSON.parse(data);

        //Sending response
        res.send(`${resource.payload} ` + moment().format('DD/MM/YYYY HH:m:ss'));
    });
});

//Run server
app.listen(port, () => {
    console.log('Server is runned');
});