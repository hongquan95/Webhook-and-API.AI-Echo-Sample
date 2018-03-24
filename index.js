"use strict";
var blynk = require('./blynkRes');
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
var rp = require('request-promise');
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
  // async function test() {
  //   // var result = await db.collection('hospitals').findOne({name: '医療法人神甲会隈病院'})
  //   console.log("nhay vao");
  //   var err,response, body = await request('http://188.166.206.43/3dddac1594e74646bde292060be39113/get/D2');
  //   console.log('after findResult: ', body);
  //   }
  

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
                  // var options = {
                  //   uri: 'http://188.166.206.43/3dddac1594e74646bde292060be39113/get/D2',
                  //   // qs: {
                  //   //     access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
                  //   // },
                  //   headers: {
                  //       'User-Agent': 'Request-Promise'
                  //   },
                  //   json: true // Automatically parses the JSON string in the response
                  // };
                  // // var ss = "";
                  // function test(){
                  //   return rp(options)
                  //   .then(function (repos) {
                  //       console.log('content', repos);
                  //       return repos;
                  //   });
                  //   // .catch(function (err) {
                  //   //     // API call failed...
                  //   // });
                  // }
                  // var ss = test().then(function (id) {
                  //   console.log('Got the following id:', id)
                  // })
                  // console.log("ss=",ss);
                  // console.log("s=",s);
                                                      // async function getJSONAsync() {

                                                      //     // The await keyword saves us from having to write a .then() block.
                                                      //     let json = await axios.get('http://188.166.206.43/3dddac1594e74646bde292060be39113/get/D2');

                                                      //     // The result of the GET request is available in the json variable.
                                                      //     // We return it just like in a regular synchronous function.

                                                      //     return json;
                                                      // }

                                                      // var J = getJSONAsync().then( function(result) {
                                                      //   console.log("TYPE BODY = ", typeof(result));
                                                      //   console.log("BODY = ", result.data);
                                                      //   return result.data
                                                      // });
                                                      //--------------------------------
                                                      // console.log("RESULT = ", j.data)
            // var request = require("request");
            // var userDetails;
            
            // function initialize() {
            //     // Setting URL and headers for request
            //     var options = {
            //         url: 'http://188.166.206.43/3dddac1594e74646bde292060be39113/get/D2',
            //         headers: {
            //             'User-Agent': 'request'
            //         }
            //     };
            //     // Return new promise 
            //     return new Promise(function(resolve, reject) {
            //       // Do async job
            //         request.get(options, function(err, resp, body) {
            //             if (err) {
            //                 reject(err);
            //             } else {
            //                 resolve(JSON.parse(body));
            //             }
            //         })
            //     })
            
            // }
            // var J = "";
            // function main() {
            //     var initializePromise = initialize();
            //     initializePromise.then(function(result) {
            //         userDetails = result;
            //         console.log("Initialized user details");
            //         // Use user details from here
            //         console.log("XXX",userDetails);
            //         J = userDetails;
            //     }, function(err) {
            //         console.log(err);
            //     })
            // }
            
            // main();
            console.log("Number-1 ");
            async function getJSONAsync() {

              // The await keyword saves us from having to write a .then() block.
              let json = await axios.get('http://188.166.206.43/3dddac1594e74646bde292060be39113/get/D2');
      
              // The result of the GET request is available in the json variable.
              // We return it just like in a regular synchronous function.
              return json;
          }
          console.log("Number0 ");          
          getJSONAsync().then( function(result) {
            console.log("Result ==", result);
              var speech = "Den D2 dang " + result.data;
              return res.json({
                speech: speech,
                displayText: speech,
                source: "webhook-echo-sample"
              });
          });
  console.log("Number1 ");
  // var speech = "Den D2 dang ";
  // return res.json({
  //   speech: speech,
  //   displayText: speech,
  //   source: "webhook-echo-sample"
  // });
    
});

restService.get('/echo', function (req, res) {

  var bien = j;
  res.locals.googleRes =  bien;
  res.render('pages/echo');
})


restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
