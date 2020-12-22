const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const Patient = require('./models/Patient');

module.exports = {
  async getPatientById(call, callback) {
    const { id } = call.request;

    const patient = await Patient.findById(id);

    if (!patient) {
      return callback(null, { error: 'User not found' });
    }

    return callback(null, {
        patient: { ...patient.toObject(), id: patient._id, password: undefined },
    });
  },
  async registerPatient(call, callback) {
    const { email, username, password } = call.request.patient;
    
    const patient = await Patient.create({ email, username, password });

    return callback(null, { patient: { ...patient.toObject(), id: patient._id } });
  },
  async loginPatient(call, callback) {
    const { email, password } = call.request.patient;
    const patient = await Patient.findOne({ email });

    if (!patient) {
      return callback(null, { error: 'User not found' });
    }

    if (!(await patient.compareHash(password))) {
      return callback(null, { error: 'Invalid password' });
    }

    const token = Patient.generateToken(patient);

    return callback(null, {
      token,
    });
  },
  async authenticate(call, callback) {
    const { token: fullToken } = call.request;

    if (!fullToken) {
      callback(null, { error: 'No token provided' });
    }

    const parts = fullToken.split(' ');

    if (!parts.length === 2) {
      return callback(null, { error: 'Token error' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return callback(null, { error: 'Token malformatted' });
    }

    try {
      const decoded = await promisify(jwt.verify)(token, 'NEhWlfANthJJWerxdVc4HLxgYqOzpA');

      const patient = await Patient.findById(decoded.id);
      return callback(null, { patient: { ...patient.toObject(), id: patient._id } });
    } catch (err) {
      return callback(null, { error: 'Token invalid' });
    }
  },
};