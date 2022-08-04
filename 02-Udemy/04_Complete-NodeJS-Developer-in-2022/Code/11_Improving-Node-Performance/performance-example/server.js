const express = require('express');
// const cluster = require('cluster');
// const os = require('os');

const app = express();

const delay = duration => {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // event loop is blocked...
  }
};

app.get('/', (req, res) => {
  res.send(`Performance example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
  delay(9000);
  res.send(`Beep beep beep! ${process.pid}`);
});

console.log('Running server.js');
console.log('Worker has been started.');
app.listen(3000);
