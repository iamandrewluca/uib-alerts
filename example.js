angular.module('ui.bootstrap.demo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui.bootstrap.alerts']);
angular.module('ui.bootstrap.demo').controller('AlertDemoCtrl', function ($scope) {
  $scope.alerts = [
    {
      id: 'error',
      type: 'danger',
      msg: 'Oh snap! Change a few things up and try submitting again.',
      timeout: 2000,
      close: true
    },{
      id: 'success',
      type: 'success',
      msg: 'Well done! You successfully read this important alert message.'
    },
    {
      id: 'jora',
      type: 'success',
      msg: 'Well done Jora!',
      timeout: 0,
      close: true
    }
  ];

  $scope.count = 0
  
  $scope.addAlert = function() {
    $scope.$broadcast('uib.alerts.add', $scope.alerts[$scope.count++]);
    if ($scope.count > 2) {
      $scope.count = 0;
    }
  };

  $scope.$on('uib.alerts.closed', function(event, alertId) {
    console.log(alertId);
  });
});