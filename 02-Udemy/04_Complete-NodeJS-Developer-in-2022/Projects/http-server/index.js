const http = require('http');

const PORT = 3000;
const server = http.createServer();

const friends = [
  {
    id: 0,
    name: 'Khalil ibn Ahmad',
  },
  {
    id: 1,
    name: 'Sir Siibawayh',
  },
  {
    id: 2,
    name: 'Ibn Jazari',
  },
];

server.on('request', (req, res) => {
  const items = req.url.split('/');
  if (req.method === 'POST' && items[1] === 'friends') {
    req.on('data', data => {
      const friend = data.toString();
      console.log('Request: ', friend);
      friends.push(JSON.parse(friend));
    });
    req.pipe(res);
  } else if (req.method === 'GET' && items[1] === 'friends') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    if (items.length === 3) {
      const friendIdx = +items[2];
      res.end(JSON.stringify(friends[friendIdx]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (items[1] === 'messages') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body>');
    res.write('<ul>');
    res.write('<li>Hello Siibawayh!</li>');
    res.write('<li>What are your thoughts on Grammar?</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
