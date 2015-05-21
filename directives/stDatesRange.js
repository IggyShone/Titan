/**
 * TODO: search exact substrings !!
 */

titanApp.directive('stDatesRangeFilter', ['$compile', function ($compile) {
    return {
        restrict: "AE",
        require: '^stTable',
        replace: true,
        compile: function (element, attr) {


            var datesText = '<input type="daterange" ng-model="dates" separator="/" opens="right" ranges="({ \'Today\': [moment(), moment()],'+
                '                           \'Yesterday\': [moment().subtract(1, \'days\'), moment().subtract(1, \'days\')],'+
                '                           \'Last 7 Days\': [moment().subtract(6, \'days\'), moment()],'+
                '                           \'Last 30 Days\': [moment().subtract(29, \'days\'), moment()],'+
                '                           \'This Month\': [moment().startOf(\'month\'), moment().endOf(\'month\')],'+
                '                           \'Last Month\': [moment().subtract(1, \'month\').startOf(\'month\'), moment().subtract(1, \'month\').endOf(\'month\')]})" ' +
                'style="background-color: #fff;border: 1px solid #ccc;box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);display: inline-block;padding: 4px 6px;' +
                'margin-bottom: 10px;color: #555;vertical-align: middle;border-radius: 4px;max-width: 100%;line-height: 28px;cursor: text;min-width: 100%;"/>';


            var compiledElementFunction = $compile(datesText);

            return {
                post: function postLink(scope, element, attributes, ctrl) {
                    //var startDate = attr["startDate"];
                    //var endDate = attr["endDate"];

                    var startDate = moment().year(-20);//attr["startDate"];
                    var endDate = moment();//attr["endDate"];

                    var compiledTagger = compiledElementFunction(scope);

                    element.replaceWith(compiledTagger);

                    scope.$watch(function (scope) {
                        return scope.dates;

                    }, function (newValue, oldValue) {

                        //ctrl.tableState().search.isRangeSearch = true;
                        //var predicateObject = ctrl.tableState().search.predicateObject || {};
                        //var predicate = predicateObject['CreatedTime'] || [];
                        ////
                        ////if (!Array.isArray(predicate)) {
                        ////    // you can either have stTags or stSearch!
                        ////    // TODO: add better explanation
                        ////    throw "Cannot have stDateRange and stSearch on the same column!"
                        ////}
                        ////else {
                        //if (newValue && newValue.length > 0) {
                        //
                        //    dates = newValue.split('/');
                        //    predicateObject['CreatedTime'] = {to:dates[0], from:dates[1]};
                        //
                        //    ctrl.tableState().search.predicateObject = predicateObject;
                        //} else {
                        //    ctrl.tableState().search.predicateObject = predicateObject;
                        //}
                        //ctrl.search();
                        //
                        //ctrl.tableState().search.isRangeSearch = false;
                        //}

                    });
                }
            }
        }
    }
}]);