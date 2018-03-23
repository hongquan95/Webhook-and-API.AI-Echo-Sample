"use strict";

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
  //-----------------------------------
  var request = require('request');
  request('http://blynk-cloud.com/dd6aa1dccaec458d9b8a29f0e8168339/get/D2', function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
  j = body;
  });

  //--------------------------------
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

restService.get('/echo', function (req, res) {

  var bien = j;
  res.locals.googleRes =  bien;
  res.render('pages/echo');
})


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
