require('dotenv').config(); 
const { TranslationServiceClient } = require('@google-cloud/translate');
const translationClient = new TranslationServiceClient();
const { googleapi } = require('../key');
const apiKey = googleapi;
console.log(apiKey)

class Transalator {
    
}
// const translate = new Translate({
//     key: apiKey, // Provide your API key
//   });