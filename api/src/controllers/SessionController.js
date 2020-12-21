const PatientService = require('../services/patient');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const response = await PatientService.loginPatient({
      patient: { email, password },
    });

    return res.json(response);
  }
}

module.exports = new SessionController();