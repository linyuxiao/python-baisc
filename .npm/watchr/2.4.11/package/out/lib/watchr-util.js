// Generated by CoffeeScript 1.7.1
(function() {
  var extendr, extractOpts, fsUtil, watchrUtil;

  extendr = require('extendr');

  extractOpts = require('extract-opts').extractOpts;

  fsUtil = require('safefs');

  watchrUtil = {
    statChanged: function(old, current) {
      if ((old != null) !== (current != null)) {
        return true;
      } else if ((old != null) && (current != null)) {
        old = extendr.dereference(old);
        current = extendr.dereference(current);
        if (old.atime != null) {
          delete old.atime;
        }
        if (old.ctime != null) {
          delete old.ctime;
        }
        if (current.atime != null) {
          delete current.atime;
        }
        if (current.ctime != null) {
          delete current.ctime;
        }
        if (JSON.stringify(old) !== JSON.stringify(current)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    watch: function(opts, next) {
      var err, fswatcher, _ref;
      _ref = extractOpts(opts, next), opts = _ref[0], next = _ref[1];
      if (fsUtil.watch == null) {
        return next(null, false, 'watch');
      }
      try {
        fswatcher = fsUtil.watch(opts.path, opts.listener);
      } catch (_error) {
        err = _error;
        return next(err, false, 'watch', fswatcher);
      }
      return next(null, true, 'watch', fswatcher);
    },
    watchFile: function(opts, next) {
      var err, _ref;
      _ref = extractOpts(opts, next), opts = _ref[0], next = _ref[1];
      if (fsUtil.watchFile == null) {
        return next(null, false, 'watchFile');
      }
      try {
        fsUtil.watchFile(opts.path, {
          persistent: opts.persistent,
          interval: opts.interval
        }, opts.listener);
      } catch (_error) {
        err = _error;
        return next(err, false, 'watchFile');
      }
      return next(null, true, 'watchFile');
    },
    watchMethods: function(opts, next) {
      var methodOne, methodTwo, _ref;
      _ref = extractOpts(opts, next), opts = _ref[0], next = _ref[1];
      if (opts.methods == null) {
        opts.methods = ['watch', 'watchFile'];
      }
      methodOne = watchrUtil[opts.methods[0]];
      methodTwo = watchrUtil[opts.methods[1]];
      methodOne(opts, function(errOne, success, method, fswatcher) {
        if (success) {
          return next(null, success, method, fswatcher);
        }
        return methodTwo(opts, function(errTwo, success, method, fswatcher) {
          var errCombined;
          if (success) {
            return next(null, success, method, fswatcher);
          }
          errCombined = new Error("Both watch methods failed on " + opts.path + ":\n" + (errOne.stack.toString()) + "\n" + (errTwo.stack.toString()));
          return next(errCombined, false, null, fswatcher);
        });
      });
      return this;
    }
  };

  module.exports = watchrUtil;

}).call(this);
