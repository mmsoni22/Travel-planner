const path = require('path');
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({urlencoded : false}));

app.use(express.static("dist"));

const port = 3000;

app.listen(port , ()=> {
    console.log(`Travel app is running on port ${port}`);
})

app.get('/', function (req, res) {
    res.sendFile("dist/index.html");
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})