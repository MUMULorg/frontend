const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        '/**',
        createProxyMiddleware({
            target: "https://api-mumul.site",
            changeOrigin: true,
            secure: false,
        })
    );
};