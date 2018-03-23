"use strict";
var blynk = require('./blynkRes');
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
//Quan:     3dddac1594e74646bde292060be39113
//Tu:     dd6aa1dccaec458d9b8a29f0e8168339
    
    // const newResult = await doSomethingElse(result);
    // const finalResult = await doThirdThing(newResult);
    // console.log(`Got the final result: ${finalResult}`);

  

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
  // var a = blynk.check_den1_stt();
  // console.log("HELLO");
  // // console.log(a);
  // var request = require('request');
  //   request('http://188.166.206.43/dd6aa1dccaec458d9b8a29f0e8168339/get/D2', function (error, response, body) {
  //   console.log('Status:', response.statusCode);
  //   console.log('Headers:', JSON.stringify(response.headers));
  //   console.log('Response:', body);
  //   j = body;
  //   });
    
  axios({
    method:'get',
    url:'http://188.166.206.43/3dddac1594e74646bde292060be39113/get/D2',
    responseType:'json'
  })
    .then(function(response) {
      console.log(response.data)
  });
  var a = axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
  
  //--------------------------------
  
  var speech = "Den D2 dang " + a;
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
