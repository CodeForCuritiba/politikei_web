var express = require("express");
var app = express();


app.use(express.static(__dirname + '/app'));


// bind the app to listen for connections on a specified port
var port = process.env.PORT || 3000;
app.listen(port);

// Render some console log output
console.log("Listening on port " + port);