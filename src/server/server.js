const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
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
      allow: 'multipart/form-data'
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
