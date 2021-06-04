/**
 * check-in/create.js
 *
 * Create check in.
 */
module.exports = async function create(req, res) {
  let checkIn = await CheckIn.create(req.body).fetch();
  res.ok();
};
