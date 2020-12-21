const load = require('../pb/loader');

const PatientClient = load({
  serviceName: 'PatientService',
  address: 'localhost:30334',
  fileName: 'patient',
});

module.exports = PatientClient;