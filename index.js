"use strict";
var blynk = require('./blynkRes');
const express = require("express");
const bodyParser = require("body-parser");


const restService = express();
restService.set('view engine', 'ejs');
var j = "";

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  //------------------------------
  var a = blynk.check_den1_stt();
  console.log("HELLO");
  console.log(a);
  //--------------------------------
  var speech =
    "Den D2 dang " + a;
    // req.body.result &&
    // req.body.result.parameters &&
    // req.body.result.parameters.echoText
    //   ? req.body.result.parameters.echoText
    //   : "Seems like some problem. Speak again.";
  return res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample",
    top: "I am Quan"
  });
});

restService.get('/echo', function (req, res) {

  var bien = j;
  res.locals.googleRes =  bien;
  res.render('pages/echo');
})


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
