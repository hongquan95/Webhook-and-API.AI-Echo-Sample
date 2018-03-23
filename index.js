"use strict";

const express = require("express");
const bodyParser = require("body-parser");


const restService = express();
restService.set('view engine', 'ejs');
var j;

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  j = req.body.result;
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.echoText
      ? req.body.result.parameters.echoText
      : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample",
    top: "I am Quan"
  });
});

restService.get('/', function (req, res) {
  // console.log("Nhan mot GET Request ve Homepage");
  // var drinks = [
  //   { name: 'Bloody Mary', drunkness: 3 },
  //   { name: 'Martini', drunkness: 5 },
  //   { name: 'Scotch', drunkness: 10 }
  // ];
  // res.locals.a = drinks;
  // res.locals.title = 'My App';
  res.render('pages/echo');
  res.send(j);
})


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
