const express = require("express");
const bodyParser = require("body-parser"); // You never know when you need a body parser....
const morgan = require("morgan");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;


// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use morgan logger

app.use(morgan('dev'));

// Add public folder

app.use(express.static("public"));

// HTML route

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "index.html"))
})

// start the server
app.listen(PORT, () => {
  console.log(
    "Server is running on http://localhost:3001 or http://127.0.0.1:3001"
  );
});