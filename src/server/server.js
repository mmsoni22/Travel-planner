const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({urlencoded : false}));

app.use(express.static("src/client"));

const port = 8080;

app.listen(port , ()=> {
    console.log(`Travel app is running on port ${port}`);
})