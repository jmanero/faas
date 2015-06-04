var DataDog = require('connect-datadog');
var Express = require('express');
var HTTP = require('http');

require('../lib/config');

var app = Express();
var server = HTTP.createServer(app);

if (Config.get('datadog:enable'))
  app.use(DataDog(Config.get('datadog')));

require('../lib/control').attach(app);

server.listen(Config.get('service:listen'), function() {
  Log.info('Listening on port TCP/' + Config.get('service:listen'));
});
