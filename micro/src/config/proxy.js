const { createProxyMiddleware } = require('http-proxy-middleware');

const setupProxies = (app, routes) => {
    routes.forEach(r => {
        app.use(r.url, createProxyMiddleware(r.proxy));
    })
}

// app.use('/credit', createProxyMiddleware({
//     target: "http://localhost:5004",
//     changeOrigin: true,
//     pathRewrite: {
//         [`^/credit`]: '',
//     },
// }));


exports.setupProxies = setupProxies