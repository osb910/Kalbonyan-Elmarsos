const axios = require('axios');

axios
  .get('https://www.wikipedia.org')
  .then(res => {
    console.log(res);
  })
  .catch(err => console.log(err))
  .then(() => console.log('All done'));
