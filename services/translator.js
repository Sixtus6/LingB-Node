require('dotenv').config(); 
const { Translate } = require('@google-cloud/translate');
const apiKey = process.REDIS_HOST;
console.log(apiKey)
// const translate = new Translate({
//     key: apiKey, // Provide your API key
//   });