module.exports = mount;
function mount (route, fn) {
  if (typeof route !== 'string') {
    throw new TypeError('must specify string as first parameter');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('must specify function as second parameter');
  }
  if (route.substr(-1) !== '/') route += '/';
  var baseUrl = route.substr(0, route.length - 1);

  return function mountHandler (req, res, next) {
    var originalUrl = req.url;
    var sub = originalUrl.substr(0, route.length);
    if (sub !== route && (sub + '/') !== route) return next();

    var path = originalUrl.substr(route.length - 1) || '/';

    // store URL components like in Express
    req.originalUrl = originalUrl;
    req.baseUrl = baseUrl;
    req.path = path;
    req.url = path;

    fn(req, res, function mountHandlerReset (err) {
      // reset the URL
      req.url = originalUrl;
      next(err);
    });
  };
}
