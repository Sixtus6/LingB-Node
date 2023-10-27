const { Translate } = require('@google-cloud/translate');
require('dotenv').config();
const apiKey = 'your-api-key';

const translate = new Translate({
    key: apiKey, // Provide your API key
  });