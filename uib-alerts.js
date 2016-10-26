angular.module('ui.bootstrap.alerts', ['ui.bootstrap.alert'])
.controller('UibAlertsController', ['$scope', '$element', '$attrs', '$interpolate', '$timeout', function($scope, $element, $attrs, $interpolate, $timeout) {
  
  $scope.timeouts = {};
  $scope.alerts = {};
  
  $scope.$on('uib.alerts.add', function(event, alert) {
    $scope.addAlert(alert);
  });
  
  $scope.addAlert = function(alert) {
    
    if ($scope.alerts[alert.id]) {
      
      var timeout = $scope.timeouts[alert.id];
      if (timeout) {
        $timeout.cancel(timeout);
      }
      
    } else {
      $scope.alerts[alert.id] = alert; 
    }
    
    if (alert.timeout && alert.timeout > 0) {
      $scope.timeouts[alert.id] = $timeout($scope.closeAlert, alert.timeout, true, alert.id);
    }
  }
  
  $scope.closeAlert = function(id) {
    
    var timeout = $scope.timeouts[id];
    if (timeout) {
      $timeout.cancel(timeout);
      delete $scope.timeouts[id];
    }
    
    delete $scope.alerts[id];
    
    $scope.$emit('uib.alerts.closed', id);
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