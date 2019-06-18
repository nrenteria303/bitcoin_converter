const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    // console.log(req.body.crypto);
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;
    // var finalUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/" + crypto + fiat; 

    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        }
    }

    request(options, function(error, response, body) {
        var data = JSON.parse(body);
        var price = data.price;
        // var weekAvg = data.averages.week;
        var currentDate = data.time;
        res.write("<p style=\"font-size: 2rem;\">The current date is " + currentDate + "</p>");
        res.write("<h1 style=\"font-size: 3.8rem;\">" + amount + crypto + " is equal to " + price + fiat + ".</h1>");
        res.send();
    });
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});