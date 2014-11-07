var Express = require('express');
var HTTP = require('http');
require('../lib/config');

var app = Express();
var server = HTTP.createServer(app);

require('../lib/control').attach(app);
server.listen(Config.get('service:listen'), function() {
  console.log('Listening on port TCP/' + Config.get('service:listen'));
});
