var FS = require('fs');
var Path = require('path');

global.Config = require('nconf');

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
  }
});
