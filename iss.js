/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) {
  const URL = "https://api.ipify.org?format=json";
  // use request to fetch IP address from JSON API
  request(URL, (error, response, body) => {
    if (error) {
      return callback(error, null); // error=error ip=null for callback
    } else if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null); // error=message ip=null for callback
      return;
    } else {
      const ip = JSON.parse(body).ip;
      callback(null, ip); //error=null ip=ip for callback
    }
  });
};

module.exports = { fetchMyIP };