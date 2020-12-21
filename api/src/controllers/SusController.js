const SusService = require('../services/sus');

class PurchaseController {
    async index(req, res) {
      const response = await SusService.listQuerys({ userId: req.userId });
  
      return res.json(response);
    }
  
    async show(req, res) {
      const { id } = req.params;
  
      const response = await SusService.getQueryById({ id });
  
      return res.json(response);
    }
  
    async store(req, res) {
      const { hospital, doctor, data } = req.body;
  
      const response = await SusService.Query({
        query: { hospital, doctor, data ,userId: req.userId },
      });
  
      return res.json(response);
    }

    async hospital(req, res) {
        const { cep } = req.params;
        console.log(cep);
        const response = await SusService.getHospital({ cep });
    
        return res.json(response);
    }
  }
  
  module.exports = new PurchaseController();