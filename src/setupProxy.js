const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  // app.use(proxy('/api', { target: 'http://localhost:5000' }));
  app.use(
    proxy(['/logistics', '/fileserver'], { target: 'http://localhost:52773' })
  );
  app.use(proxy('/notif', { target: 'http://localhost:9999' }));
};
