const axios = require('axios').default;

async function getAutoSuggestions() {
    try {
      const response = await axios.get('/user?ID=12345');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

export deafult getAutoSuggestions;