const PatientService = require('../services/patient');

const { promisify } = require('util');

module.exports = async (req, res, next) => {
  try {
    const response = await PatientService.authenticate({
      token: req.headers.authorization,
    });
    if (response.error) throw new Error(response.error);

    req.userId = response.patient.id;

    next();
  } catch ({ message }) {
    return res.status(401).json({ error: message });
  }
};