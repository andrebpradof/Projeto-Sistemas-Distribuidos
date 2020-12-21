const { Router } = require('express');

const PatientController = require('./controllers/PatientController');
const SusController = require('./controllers/SusController');
const SessionController = require('./controllers/SessionController');

const authMiddleware = require('./middlewares/auth');

const router = Router();

router.get('/users/:id', PatientController.show);
router.post('/users', PatientController.store);
router.post('/sessions', SessionController.store);

router.use(authMiddleware);

router.get('/query', SusController.index);
router.get('/query/:id', SusController.show);
router.post('/query', SusController.store);
router.get('/hospital/:cep', SusController.hospital);

module.exports = router;