const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/admin',
        createProxyMiddleware({
            target: 'http://symfony:8000/admin/',
            changeOrigin: false,
        })
    );
    app.use(
        '/bundles',
        createProxyMiddleware({
            target: 'http://symfony:8000/bundles',
            changeOrigin: true,
        })
    );
    app.use(
        '/_wdt',
        createProxyMiddleware({
            target: 'http://symfony:8000/_wdt',
            changeOrigin: false,
        })
    );
    app.use(
        '/_profiler',
        createProxyMiddleware({
            target: 'http://symfony:8000/_profiler',
            changeOrigin: false,
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