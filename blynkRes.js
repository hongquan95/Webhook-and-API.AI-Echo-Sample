// blynkRes.js
// ========
const axios = require("axios");
module.exports = {
  get_pin_value: async function (url) {
    let json = await axios.get(url);
    return json;
  },
};

