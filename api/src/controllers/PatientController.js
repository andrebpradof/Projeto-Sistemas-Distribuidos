const PatientService = require('../services/patient');

class PatientController {
  async show(req, res) {
    const { id } = req.params;

    const response = await PatientService.getPatientById({ id });

    return res.json(response);
  }

  async store(req, res) {
    const { email, username, password } = req.body;
    console.log(req.body);
    const response = await PatientService.registerPatient({
      patient: { email, username, password },
    });

    return res.json(response);
  }
}

module.exports = new PatientController();