# connect-mount

[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

This is a standalone middleware for mounting a path. This is a common feature of Express/Connect/etc typically exposed as `app.use(string, fn)`.

This also stores `req.baseUrl`, `req.path` and `req.originalUrl` like in Express.

This module was adapted from [stacked](https://github.com/fgnass/stacked).

## Install

```sh
npm install connect-mount --save
```

## Examples

```js
var http = require('http');
var mount = require('connect-mount');
var serveStatic = require('serve-static');

// could also be express, connect, etc
var app = require('stacked')();

// when user hits /foo they are actually being served 'build' assets
app.use(mount('/foo', serveStatic('build')));

http.createServer(app).listen(8080);
```

## Usage

[![NPM](https://nodei.co/npm/connect-mount.png)](https://www.npmjs.com/package/connect-mount)

#### `middleware = mount(path, fn)`

Mounts the `path`, like `'/foo'`, so that when it's hit, you will get a callback in `fn(req, res, next)`. After `next()` is called, the URL is reset to its original value for fall-back middleware functions.

For example, if the users requests '/foo/bar/test.txt', the function will be called like so:

```js
var mount = require('connect-mount');
var serveStatic = require('serve-static');

var handler = mount('/foo/bar', function (req, res, next) {
  console.log(req.originalUrl); // '/foo/bar/test.txt'
  console.log(req.baseUrl);     // '/foo/bar'
  console.log(req.path);        // '/test.txt'
  console.log(req.url);         // '/test.txt'
});

http.createServer(handler).listen(8080);
```

## License

MIT, see [LICENSE.md](http://github.com/Jam3/connect-mount/blob/master/LICENSE.md) for details.
