var FS = require('fs');
var Path = require('path');

var Winston = require('winston');

global.Config = require('nconf');
global.Log = new Winston.Logger();
Log.add(Winston.transports.Console, {
  colorize: true,
  timestamp: true
});

Config.file(Path.resolve(__dirname, '../config.json'));
Config.defaults({
  github: {
    owner: 'snipe',
    repo: 'nofuckstogive.today',
    branch: 'gh-pages',
    index: 'images/fucks',
    api: 'api.github.com',
    raw: 'raw.githubusercontent.com'
  },
  service: {
    listen: 9001
  },
  datadog: {
    enable: false,
    stat: 'node.faas',
    path: true,
    method: true,
    protocol: true,
    response_code: true
  }
});

Log.info('Starting FAAS');
