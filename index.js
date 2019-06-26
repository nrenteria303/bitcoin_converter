const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    var price;
    var currentDate;
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;

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
        price = data.price;
        currentDate = data.time;
        res.render("data", {
            price: price,
            amount: amount,
            crypto: crypto,
            fiat: fiat,
            currentDate: currentDate
        });
    });
});

app.listen(process.env.PORT || 3000, function() {
    console.log('Server is running on port 3000');
});