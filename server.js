var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 1138;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));

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
	return res.json(reservations);
});

app.get("/api/waitlist/", function(req, res) {
	return res.json(waitlist);
});

app.post("/api/reservations", function(req, res) {
	if (reservations.length < 5) {
		var newReservation = req.body;
		newReservation.routeName = newReservation.id.replace(/\s+/g, "").toLowerCase();
		console.log(newReservation);
		reservations.push(newReservation);
		console.log(reservations);
		res.json(newReservation);
		alert("You've got a table!");
	}
	else {
		var newWaitlist = req.body;
		newWaitlist.routeName = newWaitlist.id.replace(/\s+/g, "").toLowerCase();
		console.log(newWaitlist);
		waitlist.push(newWaitlist);
		res.json(newWaitlist);
		alert("We're all booked, but you've been added to the waitlist");
	}
})

app.listen(PORT, function() {
	console.log("Server is up and listening on PORT " + PORT);
});
