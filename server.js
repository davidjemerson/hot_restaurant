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

app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
	res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
	res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/api/reservations/:reservation", function(req, res) {
	var chosen = req.params.reservation;

	console.log(chosen);

	for (var i = 0 ; i < reservations.length ; i++) {
		if (chosen === reservations[i].routeName) {
			return res.json(reservations[i]);
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