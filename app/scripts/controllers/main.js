'use strict';

/**
 * @ngdoc function
 * @name angular3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angular3App
 */
angular.module('angular3App')
  .controller('MainCtrl', function ($scope) {
    var vm = this;

    console.log(process.cwd());
    var remote = require('remote');
    var InspectionManager = remote.require('./lib/inspectionManager.js');
    var inspectionManager = new InspectionManager();

    var inspections = vm.inspections = inspectionManager.inspections;
    inspections.forEach(function (inspection) {
      inspection.on('change', function () {
        if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
          $scope.$apply();
        }
      });
    });


    vm.inspect = function () {
      inspectionManager.run();
    };
    vm.getStatusClass = function (inspection) {
      return {
        'list-group-item-info': inspection.status === 'progress',
        'list-group-item-success': inspection.resultStatus === 'success',
        'list-group-item-danger': inspection.resultStatus === 'error',
        'list-group-item-warning': inspection.resultStatus === 'warning',
        'inspection-item-progress': inspection.status === 'progress'
      };
    };
    vm.getGlphicon = function (inspection) {
      return {
        'glyphicon-refresh': inspection.status === 'progress' || inspection.status === 'pending',
        'glyphicon-ok-sign': inspection.resultStatus === 'success',
        'glyphicon-exclamation-sign': inspection.resultStatus === 'error',
        'glyphicon-info-sign': inspection.resultStatus === 'warning'
      };
    };
  });
