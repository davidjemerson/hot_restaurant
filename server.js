var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 1138;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var reservations = [
	{
		name: "TK-421",
		phone: "913-555-1234",
		email: "dummy@email.com",
		id: "12345"
	}
];

var waitlist = [
	{
		name: "FN-2187",
		phone: "816-555-7623",
		email: "anotherfake@email.com",
		id: "12345"
	}
];

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
	res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
	res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/reservations/", function(req, res) {
	var chosenRes = req.params.reservation;

	console.log(chosenRes);

	for (var i = 0 ; i < reservations.length ; i++) {
		if (chosenRes === reservations[i].routeName) {
			return res.json(reservations[i]);
		}
	}

	return res.json(false);
});

app.get("/api/waitlist/", function(req, res) {
	var chosenWait = req.params.wait;

	console.log(chosenWait);

	for (var i = 0 ; i < waitlist.length ; i++) {
		if (chosenWait === waitlist[i].routeName) {
			return res.json(waitlist[i]);
		}
	}

	return res.json(false);
});

app.post("/api/reservations", function(req, res) {
	var newReservation = req.body;
	newReservation.routeName = newReservation.id.replace(/\s+/g, "").toLowerCase();
	console.log(newReservation);
	reservations.push(newReservation);
	res.json(newReservation);
})

app.listen(PORT, function() {
	console.log("Server is up and listening on PORT " + PORT);
});