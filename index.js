"use strict";
var blynk = require('./blynkRes');
const express = require("express");
const bodyParser = require("body-parser");
// const axios = require("axios");
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

//------Return json to respon ----------------

function getReturn(g_res, speech){
  g_res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
    });
}

//---------------------------------------------

restService.use(bodyParser.json());

restService.post("/echo", function(g_req, g_res) {
  googleReq = g_req.body.result;
  let url = 'http://188.166.206.43/3dddac1594e74646bde292060be39113/get/D2';         
  blynk.get_pin_value(url).then( function(b_res) {
    blynkRes = b_res.body;
    var speech = "Den D2 dang " + b_res.data;
    return getReturn(g_res,speech);
  }); 
});

restService.get('/echo', function (req, res) {
  res.locals.google = googleReq ;
  res.locals.blynk = blynkRes;
  res.render('pages/echo');
})

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
