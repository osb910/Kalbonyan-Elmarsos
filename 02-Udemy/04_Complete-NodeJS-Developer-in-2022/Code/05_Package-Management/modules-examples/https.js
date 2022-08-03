const {send, read} = require('./internals');
const request = (url, data) => {
  send(url, data);
  return read();
};

const responseData = request('https://google.com', 'hello');
console.log(responseData);
