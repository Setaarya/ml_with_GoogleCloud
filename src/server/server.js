const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const { loadAppModel } = require('../services/loadModel');

const init = async () => {
  await loadAppModel();

  const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
        headers: ['Accept', 'Content-Type'],
        additionalHeaders: ['X-Requested-With']
      },
      payload: {
        maxBytes: 1000000,
        output: 'stream',
        parse: true,
        multipart: true,
        allow: 'multipart/form-data',
        failAction: async (request, h, err) => {
          // Override default error
          return h.response({
            status: 'fail',
            message: 'Payload content length greater than maximum allowed: 1000000',
            data: null
          }).code(413).takeover();
        }
      }
    }
  });

  server.route(routes);
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
