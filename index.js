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

//-------------Enum declare-----------------------

var state = {on: "0", off: "1", open: "0", close: "1"};
var room = {bed:"bedroom",kitchen:"kitchen"};
var sensor = {temp: "temperature", humi: "humidity", gas: "gas"};
var device = {led: "led", fan: "fan", door: "door", heater: "heater"}
var pin = {bedroom: "D14", kitchen: "D12", fan: "D0", heater: "D2", temp_humi: "D14", gas: "D5" };
var led
var blynk_url = 'http://188.166.206.43/dd6aa1dccaec458d9b8a29f0e8168339/'
var res = {get: "get/", update: "update/"};

//-------------------------------------------------

//------Return json to respon ----------------

function getReturn(g_res, speech){
  g_res.json({
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
    });
}

//-----------------Process Json----------------------------

function processJson(raw)
{
  var a = {};
  a.action = raw.action
  if (raw.action.includes("o."))
    a.parameters = raw.parameters;
  else
    raw.contexts.forEach(ele => {
      if ( raw.action == ele.name )
      a.parameters = ele.parameters;
    });
  return a;
}

//----------------------------------------------------------

restService.use(bodyParser.json());

//----------------Read or Write value pin --------------------------

restService.post("/echo", function(g_req, g_res) {
  googleReq = g_req.body.result;
  // var raw = {
  //   action: googleReq.action,
  //   context: googleReq.contexts
  // };
  var para = processJson(googleReq);
  // console.log("PARA =",para);

    switch (para.action)
    {
      case 'o.control-led' :
      
        if ( para.parameters.led && para.parameters.state && para.parameters.room == "" )
          return getReturn(g_res,"An unknown error");
        else
        {
          // http://blynk-cloud.com/4ae3851817194e2596cf1b7103603ef8/update/D8?value=1
          let url = blynk_url + res.update + pin[para.parameters.room] + '?value=' + state[para.parameters.state]
          console.log("URL = ", url);
          blynk.write_pin_value_via_get(url).then( function(b_res) {
            blynkRes = b_res.body;
            var speech = "The led on " + para.parameters.room + " is " + para.parameters.state;
            return getReturn(g_res,speech);    
          });
          // getReturn(g_res,url);
        }
        break;
      
      case 'o.control-a-device' :

        if ( para.parameters.device && para.parameters.state == "" )
          return getReturn(g_res,"An unknown error");
        else
        {
          // http://blynk-cloud.com/4ae3851817194e2596cf1b7103603ef8/update/D8?value=1
          let url = blynk_url + res.update + pin[para.parameters.device] + '?value=' + state[para.parameters.state]
          console.log("URL = ", url);
          blynk.write_pin_value_via_get(url).then( function(b_res) {
            blynkRes = b_res.body;
            var speech = "The " + para.parameters.device + " is " + para.parameters.state;
            return getReturn(g_res,speech);    
          });
          // getReturn(g_res,url);
        }
        break;

      case 'o.ask-device-state' :
        getReturn(g_res,'o.ask-device-state');
        break;
        
      case 'o.open-close-door' :
        getReturn(g_res,'o.open-close-door');
        break;

      case 'o.make-all' :
        getReturn(g_res,'o.make-all');
        break;

      case 'o.check-status-led' :
        getReturn(g_res,'o.check-status-led');
        break;
      
      case 'o.check-device' :
        getReturn(g_res,'o.check-device');
        break;
        
      case 'o.check-all' :
        getReturn(g_res,'o.check-all');
        break;

      case 'o.see-sensor' :
        getReturn(g_res,'o.see-sensor');
        break;

      case 'ask-led-room-state' :
        getReturn(g_res,'ask-led-room-state');
        break;

      case 'ask-status-led-room' :
        getReturn(g_res,'ask-status-led-room');
        break;

      case 'turn-it-on-off' :
        getReturn(g_res,'ask-led-room-state');
        break;

      default:
        getReturn(g_res,'Invalid');
    }


  // let url = 'http://188.166.206.43/3dddac1594e74646bde292060be39113/get/D2';         
  // blynk.get_pin_value(url).then( function(b_res) {
  //   blynkRes = b_res.body;
  //   var speech = "Den D2 dang " + b_res.data;
  //   return getReturn(g_res,speech);
  // });
  
  
});

//-----------------------------------------------------------------------

restService.get('/echo', function (req, res) {
  res.locals.google = googleReq ;
  res.locals.blynk = blynkRes;
  res.render('pages/echo');
})

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
