#!/usr/bin/env node

var BodyParser = require('body-parser');
var DataDog = require('connect-datadog');
var Express = require('express');
var HTTP = require('http');

require('../lib/config');

var app = Express();
var server = HTTP.createServer(app);

if (Config.get('datadog:enable'))
  app.use(DataDog(Config.get('datadog')));

app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json())

require('../lib/control').attach(app);

server.listen(Config.get('service:listen'), function() {
  Log.info('Listening on port TCP/' + Config.get('service:listen'));
});
