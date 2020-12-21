const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PatientSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
});

PatientSchema.pre('save', async function(next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 8);
});

PatientSchema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password);
  },
};

PatientSchema.statics = {
  generateToken({ id }) {
    return jwt.sign({ id }, 'NEhWlfANthJJWerxdVc4HLxgYqOzpA', {
      expiresIn: '7d',
    });
  },
};

module.exports = mongoose.model('Patient', PatientSchema);