/**
 * check-in/create.js
 *
 * Create check in.
 */
const axios = require('axios');

module.exports = async function create(req, res) {
  let places = [];

  try {
    // Search api for the location.
    const response = await axios.get('http://api.geonames.org/search', {
      params: {
        name_equals: req.body.location,
        orderby: 'population',
        maxRows: 10,
        type: 'json',
        username: 'dimagi'
      }
    });

    if (response.data.geonames.length) {
      // Choose a winning result.
      places = response.data.geonames;

      // Inject the lat, lng into the request data.
      req.body.lat = places[0].lat;
      req.body.lng = places[0].lng;
    }
  } catch (error) {
    sails.log.error(error);
  }

  if (places.length) {
    // Create the data record and display results.
    const record = await CheckIn.create(req.body).fetch();
    return res.view('pages/check-in/success', { record: record, places: places });
  }

  return res.view('pages/check-in/fail', { location: req.body.location });
};
