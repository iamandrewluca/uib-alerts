angular.module('ui.bootstrap.alerts', ['ui.bootstrap.alert'])
.controller('UibAlertsController', ['$scope', '$element', '$attrs', '$interpolate', '$timeout', function($scope, $element, $attrs, $interpolate, $timeout) {
  
  $scope.timeouts = {};
  $scope.alerts = {};
  
  $scope.$on('uib.alerts.add', function(event, alert) {
    $scope.addAlert(alert);
  });
  
  $scope.addAlert = function(alert) {
    
    if ($scope.alerts[alert.id]) {
      console.log('alert exists');
      var timeout = $scope.timeouts[alert.id];
      if (timeout) {
        console.log('alert has timeout, clear');
        $timeout.cancel(timeout);
      }
    } else {
      console.log('new alert');
      $scope.alerts[alert.id] = alert; 
    }
    
    if (alert.timeout && alert.timeout > 0) {
      console.log('new timeout for alert');
      $scope.timeouts[alert.id] = $timeout($scope.closeAlert, alert.timeout, true, alert.id);
    }
  }
  
  $scope.closeAlert = function(id) {
    
    console.log('closing alert', id);
    
    var timeout = $scope.timeouts[id];
    if (timeout) {
      console.log('delete alert timeout');
      $timeout.cancel(timeout);
      delete $scope.timeouts[id];
    }
    
    console.log('delete alert');
    delete $scope.alerts[id];
  }
  
}])
.directive('uibAlerts', function() {
  return {
    controller: 'UibAlertsController',
    controllerAs: 'alerts',
    restrict: 'A',
    templateUrl: 'alerts.html',
    scope: {},
    transclude: true
  };
});