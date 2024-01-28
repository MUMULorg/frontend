const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
// global cors policy
app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true) // allow any origin 
    .AllowCredentials());
};