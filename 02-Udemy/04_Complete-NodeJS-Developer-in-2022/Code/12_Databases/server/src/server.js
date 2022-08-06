const http = require('http');
const app = require('./app');
const {mongoConnect} = require('./services/mongo');
const {loadPlanetsData} = require('./models/planets.model');

const PORT = process.env.PORT || 8000;
console.log(PORT);

const server = http.createServer(app);

const startServer = async () => {
  await mongoConnect();

  await loadPlanetsData();

  server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
};

startServer();
