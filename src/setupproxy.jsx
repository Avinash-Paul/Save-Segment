const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://webhook.site',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/', // remove /api prefix when forwarding the request
      },
      onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('origin', 'http://localhost:3000');
      },
    })
  );
};