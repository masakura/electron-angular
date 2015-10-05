'use strict';

/**
 * @ngdoc function
 * @name angular3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angular3App
 */
angular.module('angular3App')
  .controller('MainCtrl', function ($timeout) {
    var vm = this;

    var Inspection = function (title) {
      this.title = title;
      this.status = 'pending';
      this.resultStatus = '';
    };

    Inspection.prototype.run = function () {
      this.status = 'progress';
      this.resultStatus = '';
    };

    Inspection.prototype.finish = function (resultStatus, result) {
      this.status = 'finish';
      this.resultStatus = resultStatus;
      this.result = result;
    };

    var inspections = vm.inspections = [
      new Inspection('Node.js のバージョンは?'),
      new Inspection('npm のバージョンは?')
    ];

    vm.inspect = function () {
      inspections[0].run();

      $timeout(function () {
        inspections[0].finish('success', 'v4.1.1');

        inspections[1].run();

        $timeout(function () {
          inspections[1].finish('error', 'Unknown');
        }, 1500);
      }, 1000);
    }
    vm.getStatusClass = function (inspection) {
      return {
        'list-group-item-info': inspection.status === 'progress',
        'list-group-item-success': inspection.resultStatus === 'success',
        'list-group-item-danger': inspection.resultStatus === 'error',
        'list-group-item-warning': inspection.resultStatus === 'warning'
      };
    };
    vm.getGlphicon = function (inspection) {
      return {
        'glyphicon-stop': inspection.status === 'pending',
        'glyphicon-refresh': inspection.status === 'progress',
        'glyphicon-ok-sign': inspection.resultStatus === 'success',
        'glyphicon-exclamation-sign': inspection.resultStatus === 'error',
        'glyphicon-info-sign': inspection.resultStatus === 'warning'
      };
    };
  });
