const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'APLIKASI_SKRIPSI_API',
    description: 'Api Documentation'
  },
  host: 'localhost:5001'
};

const outputFile = './swagger-output.json';
const routes = ['./index.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
  require('./index.js');
});