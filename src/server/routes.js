const handler = require('./handler');

module.exports = [
  {
    method: 'POST',
    path: '/predict',
    handler: handler.postPredictHandler
  },
  {
    method: 'GET',
    path: '/predict/histories',
    handler: handler.getHistoriesHandler
  }
];
