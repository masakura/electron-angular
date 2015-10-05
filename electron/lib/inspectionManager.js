'use strict';

var Inspection = require('./inspection.js');

function InspectionManager () {
  this.inspections = [
    new Inspection('Node.js のバージョンは?'),
    new Inspection('npm のバージョンは?')
  ];
}

InspectionManager.prototype.run = function () {
  var inspections = this.inspections;

  inspections[0].run(function (inspection) {
    setTimeout(function () {
      inspection.finish('success', 'v4.1.1');

      inspections[1].run(function (inspection) {
        setTimeout(function () {
          inspection.finish('error', 'Unknown');
        }, 1000);
      });
    }, 1500);
  });
};

module.exports = InspectionManager;
