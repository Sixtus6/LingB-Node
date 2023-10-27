const axios = require('axios');
const { googleapi } = require('../key');
const apiKey = 'your-api-key'; // Replace with your actual API key
const text = 'Hello, World!';
const targetLanguage = 'es';

module.exports = {
    translator : async function translateText() {
        try {
          const url = 'https://translation.googleapis.com/language/translate/v2';
          const data = {
            q: text,
            target: targetLanguage,
          };
      
          const response = await axios.post(url, data, {
            params: {
              key: apiKey,
            },
          });
      
          if (response.status === 200) {
            const translation = response.data.data.translations[0].translatedText;
            console.log(`Text: ${text}`);
            console.log(`Translation: ${translation}`);
          } else {
            console.error('Error translating text:', response.statusText);
          }
        } catch (err) {
          console.error('Error translating text:', err);
        }
      }
}

