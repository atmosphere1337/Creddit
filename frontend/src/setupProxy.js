const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/admin',
        createProxyMiddleware({
            target: 'http://symfony:8000/admin/',
            followRedirects: true,
            changeOrigin: false,
        })
    );
    app.use(
        '/bundles',
        createProxyMiddleware({
            target: 'http://symfony:8000/bundles',
            followRedirects: true,
            changeOrigin: true,
        })
    );
    app.use(
        '/_wdt',
        createProxyMiddleware({
            target: 'http://symfony:8000/_wdt',
            followRedirects: true,
            changeOrigin: true,
        })
    );
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://symfony:8000/api',
            changeOrigin: true,
        })
    );
};