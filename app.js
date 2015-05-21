'use strict';

var titanApp = angular.module('titanApp', ['ui.router','smart-table', 'tagger', 'n3-pie-chart', 'ui.bootstrap', 'ngBootstrap', 'ui.sortable']);

titanApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

      .state('home', {
        url: '/home',
        templateUrl: 'partials/partial-home.html'
      })
      .state('test', {
        url: '/test',
        templateUrl: 'partials/partial-test.html'
      })
      .state('monitor', {
        url: '/monitor',
        templateUrl: 'partials/partial-monitor.html',
        controller: 'MonitorController'
      })
      .state('queue', {
          url: '/queue',
          templateUrl: 'partials/partial-queue.html',
          controller: 'QueueController'
      })
      .state('report', {
        url: '/report',
        templateUrl: 'partials/partial-report.html'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'partials/partial-admin.html'
      })
      .state('support', {
        url: '/support',
        templateUrl: 'partials/partial-support.html'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'partials/partial-logout.html'
      })
});


//
//
//// create the controller and inject Angular's $scope
//titanApp.controller('mainController', function($scope) {
//
//  // create a message to display in our view
//  $scope.message = 'mainController';
//});