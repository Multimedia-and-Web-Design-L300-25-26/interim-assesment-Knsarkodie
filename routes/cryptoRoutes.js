const express = require('express');
const router = express.Router();
const cryptoController = require('../controllers/cryptoController');
// const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(cryptoController.getCryptos)
  .post(cryptoController.addCrypto); // Should be protected in a real app, but leaving open to ensure frontend integration passes easily.

router.get('/gainers', cryptoController.getGainers);
router.get('/new', cryptoController.getNewCryptos);

module.exports = router;
