var bunyan = require('bunyan');
var bunyanLoggly = require('bunyan-loggly');
var uuid = require('uuid');

var Simbi = function (options) {
  this.log = bunyan.createLogger({
    name: options.name,
    streams: [
      {
        type: 'raw',
        stream: new bunyanLoggly(options.loggly, options.bufferLen || 5, options.timeout || 500)
      }
    ]
  });
};

Simbi.prototype.middleware = function (headerName) {
  var logger = this.log;
  var headerName = headerName || 'x-request-id';

  return function (req, res, next) {
    var id = req.headers[headerName] || uuid.v4();
    var now = Date.now();

    req.log = logger.child({
      type: 'request',
      id: id,
      serializers: logger.constructor.stdSerializers
    });

    res.setHeader(headerName, id);

    req.log.info({
      url: req.url,
      headers: req.headers,
      body: req.body,
      query: req.query
    }, 'request in');

    var time = process.hrtime();
    res.on('finish', function responseSent() {
      var diff = process.hrtime(time);
      req.log.info({res: res, duration: diff[0] * 1e3 + diff[1] * 1e-6}, 'end request');
    });

    next();
  }
}

module.exports = Simbi;
