'use strict';

module.exports = function (optUrl) {
  var url = optUrl || 'file://' + __dirname + '/index.html';

  var app = require('app');
  var BrowserWindow = require('browser-window');

  require('crash-reporter').start();

  app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
      app.quit();
    }
  });

  app.on('ready', function () {
    var main = new BrowserWindow({width: 800, height: 600});
    main.loadUrl(url);

    main.on('closed', function () {
      main = null;
    });
  });
};
