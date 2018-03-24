"use strict";
var blynk = require('./blynkRes');
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
//Quan:     3dddac1594e74646bde292060be39113
//Tu:     dd6aa1dccaec458d9b8a29f0e8168339
    

const restService = express();
restService.set('view engine', 'ejs');
var j = "";

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

var request = require('request');
  async function test() {
    // var result = await db.collection('hospitals').findOne({name: '医療法人神甲会隈病院'})
    console.log("nhay vao");
    var err,response, body = await request('http://188.166.206.43/3dddac1594e74646bde292060be39113/get/D2');
    console.log('after findResult: ', body);
    }

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  
  execute()

  function execute() {
    var result = test()
    console.log("ket qua bien result: ",result);
  }


  //--------------------------------
  // console.log("RESULT = ", j.data)
  var speech = "Den D2 dang " + j;
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
