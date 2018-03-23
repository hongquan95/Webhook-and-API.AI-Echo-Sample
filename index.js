"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const restService = express();
var j;

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  j = req;
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
  console.log("Nhan mot GET Request ve Homepage");
  res.send(JSON.stringify(j));
  // res.send(j);
})


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

// var server = restService.listen(8000, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log("Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s", host, port)

// })