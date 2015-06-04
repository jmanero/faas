var Crypto = require('crypto');
var MIME = require('mime');
var Path = require('path');
var URL = require('url');
var Util = require('util');

var Collection = exports.Collection = function() {
  Array.call(this);
};
Util.inherits(Collection, Array);

/* jshint esnext: true */
const UINT32 = 4294967296;
function randomnesss() { // return [0, 1)
  return Crypto.randomBytes(4).readUInt32BE(0) / UINT32;
}

Collection.prototype.random = function() {
  return this[Math.floor(this.length * randomnesss())];
};

var Image = exports.Image = function(params) {
  params = params || {};

  this.name = params.name;
  this.path = params.path;
  this.type = MIME.lookup(params.name);
  this.sha = params.sha;
};

Object.defineProperty(Image.prototype, 'raw_url', {
  enumerable: true,
  get: function() {
    return URL.format({
      protocol: 'https',
      hostname: Config.get('github:raw'),
      pathname: Path.join(Config.get('github:owner'),
        Config.get('github:repo'), Config.get('github:branch'),
        this.path)
    });
  }
});
