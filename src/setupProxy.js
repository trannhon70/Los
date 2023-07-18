const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://los.minerva.vn/',
      changeOrigin: true
    })
  );

}