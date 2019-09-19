const proxy = require('http-proxy-middleware');
require('dotenv').config();

module.exports = function(app) {
  // app.use(proxy('/api', { target: 'http://localhost:5000' }));
  app.use(
    proxy(['/logistics', '/fileserver'], {
      target: `http://localhost:${process.env.REACT_APP_DEV_IRIS_PORT}`
    })
  );
  app.use(
    proxy('/notif', {
      target: `http://localhost:${process.env.REACT_APP_INTEROP_IRIS_PORT}`
    })
  );
};
