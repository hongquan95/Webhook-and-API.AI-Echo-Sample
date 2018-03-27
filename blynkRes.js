// blynkRes.js
// ========
const axios = require("axios");
module.exports = {
  get_pin_value: async function (url) {
    let json = await axios.get(url);
    return json;
  },
  write_pin_value_via_get:  async function (url) {
    let json = axios.get(url);
    return json;
  },
  write_pin_value_via_put:  async function (url, value) {
    let json = axios.put(url, { body: value}) //"[\"1\"]"
    return json;
  },
};
