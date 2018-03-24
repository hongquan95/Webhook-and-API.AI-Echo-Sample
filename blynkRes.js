// blynkRes.js
// ========
const axios = require("axios");
module.exports = {
  test: async function (url) {
    let json = await axios.get(url);
    return json;
  },
    // check_den1_stt: async function () {
    //     var request = require('request');
    //     var save;
    //     try {
    //       var result = await request('http://188.166.206.43/3dddac1594e74646bde292060be39113/get/D2', function (error, response, body) {
    //       return body;
    //       });
    //     }
    //     catch(error) {
    //       console.log("Error!!!");
    //       }
    //       return result
    //     },
    // check_den2_stt: function () {
    //   // whatever
    // }
  };
  
  var zemba = function () {
  }