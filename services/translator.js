const axios = require('axios');
const { googleapi } = require('../key');
const apiKey = googleapi; // Replace with your actual API key
const text = 'good morning!';
const targetLanguage = 'yo';
// yo,  ig, ha
module.exports = {
    translator: async function (message, language) {
        try {
            const url = 'https://translation.googleapis.com/language/translate/v2';
            const data = {
                q: message,
                target: language,
            };

            const response = await axios.post(url, data, {
                params: {
                    key: apiKey,
                },
            });

            if (response.status === 200) {
                const translation = response.data.data.translations[0].translatedText;
                // console.log(`Text: ${text}`);
                // console.log(`Translation: ${translation}`);
                return translation
            } else {
                console.error('Error translating text:', response.statusText);
            }
        } catch (err) {
            console.error('Error translating text:', err);
        }
    }
}

