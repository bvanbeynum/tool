// set up ======================================================================
var express = require("express");
var app = express();                        // create our app w/ express
var port = process.env.PORT || 7577;

// configuration ===============================================================

app.configure(function() {
//	app.use(express.logger("dev"));         // log every request to the console
	app.use(express.bodyParser());          // pull information from html in POST
});

// routes ======================================================================

require("./approutes")(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);