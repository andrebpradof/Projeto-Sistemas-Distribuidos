const mongoose = require('mongoose');

const SusSchema = new mongoose.Schema({
  userId: String,
  hospital: String,
  doctor: String,
  data: String,
});

module.exports = mongoose.model('Sus', SusSchema);