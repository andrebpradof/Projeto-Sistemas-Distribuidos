const load = require('../pb/loader');

const SusClient = load({
  serviceName: 'SusService',
  address: 'localhost:30335',
  fileName: 'sus',
});

module.exports = SusClient;