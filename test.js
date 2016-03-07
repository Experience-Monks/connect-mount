var mount = require('./');
var test = require('tape');
var http = require('http');
var get = require('simple-get');

run('basic', '/foo/test.txt', '/foo', {
  url: '/test.txt',
  baseUrl: '/foo',
  originalUrl: '/foo/test.txt'
});

run('nested', '/foo/bas/test.txt', '/foo', {
  url: '/bas/test.txt',
  baseUrl: '/foo',
  originalUrl: '/foo/bas/test.txt'
});

run('nested mount', '/foo/bas/test.txt', '/foo/bas', {
  url: '/test.txt',
  baseUrl: '/foo/bas',
  originalUrl: '/foo/bas/test.txt'
});

run('empty', '/foo/', '/foo', {
  url: '/',
  baseUrl: '/foo',
  originalUrl: '/foo/'
});

run('empty2', '/foo', '/foo', {
  url: '/',
  baseUrl: '/foo',
  originalUrl: '/foo'
});

function run (msg, url, mountUrl, matches) {
  test(msg, function (t) {
    t.plan(4);

    var server;
    var handler = mount(mountUrl, function (req, res, next) {
      t.equal(req.url, matches.url, 'matches url');
      t.equal(req.url, req.path, 'url matches path');
      t.equal(req.baseUrl, matches.baseUrl, 'matches baseUrl');
      t.equal(req.originalUrl, matches.originalUrl, 'matches originalUrl');
      res.end();
    });
    server = http.createServer(function (req, res, next) {
      handler(req, res, next);
    });
    server.listen(8888, ready);

    function ready () {
      get.concat('http://localhost:8888' + url, function (err, res, data) {
        server.close();
        if (err) return t.fail(err);
      });
    }
  });
}
