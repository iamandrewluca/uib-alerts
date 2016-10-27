angular.module('ui.bootstrap.alerts', ['ui.bootstrap.alert'])
.controller('UibAlertsController', ['$scope', '$element', '$attrs', '$interpolate', '$timeout', function($scope, $element, $attrs, $interpolate, $timeout) {
  
  $scope.timeouts = {};
  $scope.alerts = {};
  
  var eventId;
  if ($attrs.id) {
    eventId = 'uib.alerts.add' + '.' + $attrs.id;
  } else {
    eventId = 'uib.alerts.add';
  }
  
  $scope.$on(eventId, function(event, alert) {
    $scope.addAlert(alert);
  });
  
  $scope.addAlert = function(alert) {
    
    var alertTimeout = $scope.timeout;
    if (alert.timeout && alert.timeout > 0) {
      alertTimeout = alert.timeout;
    }
    
    if ($scope.close || !alertTimeout) {
      alert.close = true;
    }
    
    if ($scope.alerts[alert.id]) {
      
      var timeout = $scope.timeouts[alert.id];
      if (timeout) {
        $timeout.cancel(timeout);
      }
      
    } else {
      $scope.alerts[alert.id] = alert; 
    }
    
    if (alertTimeout) {
      $scope.timeouts[alert.id] = $timeout($scope.closeAlert, alertTimeout, true, alert.id);
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
    scope: {
      timeout: '<',
      close: '<'
    },
    transclude: true
  };
});