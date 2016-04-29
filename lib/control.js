var HTTPS = require('https');
var Path = require('path');
var QS = require('querystring');
var Model = require('./model');

/* jshint esnext: true */
const HOUR = 3600000;
function noop() {}

exports.attach = function(app) {
  var controler = this;
  setInterval(function() {
    controler.update();
  }, HOUR);
  controler.update();

  // Return a random image URL as text/plain
  app.get('/', function(req, res, next) {
    res.type('text/plain');
    res.send(controler.collection.random().raw_url);
  });

  app.get('/html', function(req, res, next) {
    res.type('text/html');
    res.send('<html><head></head><body><img src="' +
      controler.collection.random().raw_url +
      '"></body></html>');
  });

  app.post('/slack.json', function(req, res, next) {
    res.json({
      text: controler.collection.random().raw_url
    });
  });

  app.post('/slack-command.json', function(req, res, next) {
    res.json({
      response_type: 'in_channel',
      text: '404 Fucks Not Found!',
      attachments: [{
        author_name: 'Fucks requested by ' + req.body.user_name + ':',
        color: 'danger',
        image_url: controler.collection.random().raw_url
      }]
    });
  });

  // Return the current image index
  app.get('/index.json', function(req, res, next) {
    res.json(controler.collection);
  });

  // Return the current index status
  app.get('/status.json', function(req, res, next) {
    res.json({
      source: Config.get('github'),
      updated: controler.updated,
      images: controler.collection.length
    });
  });

  app.post('/update', function(req, res, next) {
    controler.update(function(err) {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });
};

exports.update = function(callback) {
  if(!(callback instanceof Function)) callback = noop;
  var controler = this;
  var collection = new Model.Collection();

  getJSON({
    hostname: Config.get('github:api'),
    path: Path.join('/repos', Config.get('github:owner'),
      Config.get('github:repo'), 'contents',
      Config.get('github:index')) + '?' +
      QS.stringify({
        ref: Config.get('github:branch')
      }),
    headers: {
      'User-Agent': 'NodeJS/FucksAsaService'
    }
  }, function(err, images) {
    if (err) {
      Log.error('Error updating index: ' + err.message + '. Retrying in 5s');

      setTimeout(function() {
        controler.update(callback);
      }, 5000);
      return callback(err);
    }

    Log.info('Control.update: found ' + images.length + ' images');
    images.forEach(function(image) {
      collection.push(new Model.Image(image));
    });

    controler.updated = new Date();
    controler.collection = collection;
    callback();
  });
};

function getJSON(url, callback) {
  HTTPS.get(url, function(res) {
    res.setEncoding('utf8');

    var data = '';
    res.on('data', function(d) {
      data += d;
    });

    res.on('end', function(d) {
      if (d) data += d;

      if (res.statusCode !== 200)
        return callback(data);

      // Catch JSON parse errors
      try {
        var json = JSON.parse(data);
        callback(null, json);
      } catch (e) {
        callback(e);
      }
    });
  }).on('error', callback);
}
