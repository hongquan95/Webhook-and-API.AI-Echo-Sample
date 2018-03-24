"use strict";
var blynk = require('./blynkRes');
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
//Quan:     3dddac1594e74646bde292060be39113
//Tu:     dd6aa1dccaec458d9b8a29f0e8168339
const restService = express();
restService.set('view engine', 'ejs');
var googleReq, blynkRes;

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);
async function getJSONAsync(url) {

  // The await keyword saves us from having to write a .then() block.
  let json = await axios.get(url);

  // The result of the GET request is available in the json variable.
  // We return it just like in a regular synchronous function.
  return json;
}
restService.use(bodyParser.json());
restService.post("/echo", function(req, res) {
  googleReq = req.body.result;
  blynkRes = req;
  var url = 'http://188.166.206.43/3dddac1594e74646bde292060be39113/get/D2';         ;
  getJSONAsync(url).then( function(result) {
    // blynkRes = result;
    var speech = "Den D2 dang " + result.data;
    return res.json({
      speech: speech,
      displayText: speech,
      source: "webhook-echo-sample"
    });
  });
   
});

restService.get('/echo', function (req, res) {
  res.locals.google = googleReq ;
  console.log(blynkRes);
  res.render('pages/echo');
})


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
