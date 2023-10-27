const { Translate } = require('@google-cloud/translate');
require('dotenv').config();
const apiKey = process.env.DATABASE_HOST;

const translate = new Translate({
    key: apiKey, // Provide your API key
  });