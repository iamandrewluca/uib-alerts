# uib-alerts

requires: ui.bootstrap.alert  
https://github.com/angular-ui/bootstrap

Add directive in html like this
```
<div uib-alerts id="alertDirectiveId" timeout="3000" close="true"></div>
```

Show `$scope.alertObject` in directive with `alertDirectiveId` 
```
$scope.$broadcast('uib.alerts.add.alertDirectiveId', $scope.alertObject);
```

Alert Object should have this structure

```
{
  id: 'errorAlert', // required, camel case
  type: 'danger', // required, bootstrap alert type, or if have styled your own
  msg: 'Oh snap! Change a few things up and try submitting again.', // required
  timeout: 2000, // optional, if missing it will take directive timeout attribute if present
  close: true // optional, if timeout is missing, this will be set to true
}
```

If an alert is added again, it will not show duplicates, and if a timeout exists it will be reset

When an alert is closed an event is emited `uib.alerts.closed` with alert id as argument
