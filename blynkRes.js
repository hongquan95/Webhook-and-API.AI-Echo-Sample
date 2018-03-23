// blynkRes.js
// ========
module.exports = {
    check_den1_stt: function () {
        var request = require('request');
        
        var getRes;
        request('http://188.166.206.43/dd6aa1dccaec458d9b8a29f0e8168339/get/D2', function (error, response, body) {
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        console.log('Response:', body);
        
        var responseJSON = JSON.parse(body); 
        getRes = responseJSON.results.count;
    
        });
        console.log("getRes = " + getRes);
        return getRes;
    },
    check_den2_stt: function () {
      // whatever
    }
  };
  
  var zemba = function () {
  }