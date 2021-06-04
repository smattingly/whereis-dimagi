/**
 * check-in/create.js
 *
 * Create check in.
 */
const axios = require('axios');

module.exports = async function create(req, res) {

  try {
    // Search api for the location.
    const response = await axios.get('http://api.geonames.org/search', {
      params: {
        name_equals: req.body.location,
        type: 'json',
        username: 'dimagi'
      }
    });

    if (response.data.geonames.length) {
      // Choose a winning result.
      const winner = response.data.geonames[0];

      // Inject the lat, lng into the request data.
      req.body.lat = winner.lat;
      req.body.lng = winner.lng;
    }
  } catch (error) {
    sails.log.error(error);
  }

  // Create the data record and display results.
  const record = await CheckIn.create(req.body).fetch();
  res.view('pages/check-in/success', record);
};
