const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        createProxyMiddleware('/api',
        {
            target: 'http://58.181.28.53:9090/local/',
            changeOrigin: true,
            pathRewrite : {
                '^/api': '', // URL ^/api -> 공백 변경
            }
        })
    )
  };