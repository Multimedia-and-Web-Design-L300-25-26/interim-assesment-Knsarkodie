const Crypto = require('../models/Crypto');

// @desc    Get all cryptocurrencies
// @route   GET /api/crypto
// @access  Public
const getCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find({});
    res.json(cryptos);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get top gainers
// @route   GET /api/crypto/gainers
// @access  Public
const getGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find({}).sort({ change24h: -1 });
    res.json(gainers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get new listings
// @route   GET /api/crypto/new
// @access  Public
const getNewCryptos = async (req, res) => {
  try {
    const newCryptos = await Crypto.find({}).sort({ createdAt: -1 });
    res.json(newCryptos);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add new cryptocurrency
// @route   POST /api/crypto
// @access  Public (or could be private for admin, making it public based on assignment scope)
const addCrypto = async (req, res) => {
  try {
    const { name, symbol, price, image, change24h } = req.body;

    if (!name || !symbol || price === undefined || change24h === undefined) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const cryptoExists = await Crypto.findOne({ symbol });

    if (cryptoExists) {
      return res.status(400).json({ message: 'Cryptocurrency already exists' });
    }

    const crypto = await Crypto.create({
      name,
      symbol,
      price,
      image,
      change24h,
    });

    res.status(201).json(crypto);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  getCryptos,
  getGainers,
  getNewCryptos,
  addCrypto,
};
