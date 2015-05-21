
/**
 * Created by ilapshux on 5/4/2015.
 */




titanApp.filter('filterDateRange', function() {
    return function(items, key) {return items; };
    //return function(items, keyDateRangeObj) {
    //
    //    if(keyDateRangeObj.CreatedTime === undefined || keyDateRangeObj.CreatedTime == null)
    //        return items;
    //    else
    //        return items;
    //
    //    var df = keyDateRangeObj.CreatedTime.from;
    //    var dt = keyDateRangeObj.CreatedTime.to;
    //
    //    dfarray = df.split(' ').reverse();
    //    dtarray = dt.split(' ').reverse();
    //
    //    dfDateObj = new Date(dfarray[0],dfarray[1],dfarray[2]);
    //    dtDateObj = new Date(dtarray[0],dtarray[1],dtarray[2]);
    //
    //    var fData = [];
    //    for (var i=0; i<items.length; i++){
    //        var td = items[i].CreatedTime;
    //        tdarray = td.split(' ').reverse();
    //        tdDateObj = new Date(tdarray[0],tdarray[1],tdarray[2]);
    //
    //        if (tdDateObj >= dfDateObj && tdDateObj <= dtDateObj)  {
    //            fData.push(items[i]);
    //        }
    //    }
    //    return fData;
    //};
});




titanApp.filter('filterMultiple', ['$filter', function ($filter) {
    return function (items, keyObj) {

        var filterObj = {
            data: items,
            filteredData: [],
            applyFilter: function (obj, key) {
                var fData = [];
                if (this.filteredData.length == 0)
                    this.filteredData = this.data;
                if (obj) {
                    var fObj = {};
                    if (!angular.isArray(obj)) {
                        fObj[key] = obj;
                        fData = fData.concat($filter('filter')(this.filteredData, fObj));
                    } else if (angular.isArray(obj)) {
                        if (obj.length > 0) {
                            for (var i = 0; i < obj.length; i++) {
                                if (angular.isDefined(obj[i])) {
                                    fObj[key] = obj[i];
                                    fData = fData.concat($filter('filter')(this.filteredData, fObj, true));
                                }
                            }
                        }
                    }

                    this.filteredData = fData;
                }
            }
        };
        if (keyObj && Object.getOwnPropertyNames(keyObj).length > 0) {
            angular.forEach(keyObj, function (obj, key) {
                filterObj.applyFilter(obj, key);
            });

            return filterObj.filteredData;
        }
        else {
            return filterObj.data;
        }

    }
}]);

titanApp.controller('MonitorController', ['$scope', '$filter', '$location','$timeout','$modal', function ($scope, $filter, $location, $timeout, $modal) {


    //
    //modalInstance.result.then(function (selectedItem) {
    //    $scope.selected = selectedItem;
    //});

    //perOfCompleted = function(rows){
    //    completed = 0
    //    for(i=0; i<rows.length; i++) {
    //        if(rows[i].Status.toLowerCase() == "completed")
    //            completed++;
    //    }
    //    return Math.round((completed*100)/rows.length);
    //}
    //
    //perOfPassed = function(rows){
    //    passed = 0
    //    for(i=0; i<rows.length; i++) {
    //        if(rows[i].Verdict.toLowerCase() == "pass")
    //            passed++;
    //    }
    //    return Math.round((passed*100)/rows.length);
    //}


    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }



    var
        //nameList = ['Per-CI 18_1', 'Per-CI 18_0',
        //    'Per-CI 18_0_2'],
        //technologyList = ['WiFi', 'WiAMT', 'automation','WiFi2', 'WiAMT2', 'automation2','WiFi3', 'WiAMT3', 'automation3'],
        //programList = ['1.0.0', '2.0.0'],
        //cycleTypeList = ['cycle1', 'cycle2'],
        //testBedsList = ['testbed1', 'testbed2', 'testbed3'],
        ////createdtimeList = [$filter('date')(randomDate(new Date(2015, 4, 13), new Date(2015, 4, 13)), 'MM dd yyyy')],
        //createdtimeList = [moment(new Date(2015, 4, 13, 10, 10, 10)).format('MMMM Do YYYY h:mm:ss a')],
        //verdictList = ['pass', 'fail','aborted', 'errored', 'passed with warnings', 'running'],
        //ownerList = ['aaaAAA', 'bbbBBB','aaaAAA', 'bbbBBB','aaaAAAAAAAA', 'bbbBBBB','aaaAAAAAA', 'bbbBBBBBB',
        //    'aaaAAAA', 'bbbBBBBBBBB'],
        //statusList = ['running', 'completed', 'pending resources', 'execution failed', 'schedules', 'processing data', 'inconclusive'];


        nameList = ['name1', 'name2', 'name3'],
        technologyList = ['tech1', 'tech2', 'tech3','tech4', 'tech5', 'tech6','tech7', 'tech8', 'tech9'],
        programList = ['1.0.0', '2.0.0'],
        cycleTypeList = ['cycle1', 'cycle2'],
        testBedsList = ['testbed1', 'testbed2', 'testbed3'],
        //createdtimeList = [$filter('date')(randomDate(new Date(2015, 4, 13), new Date(2015, 4, 13)), 'MM dd yyyy')],
        createdtimeList = [moment(new Date(2015, 4, 13, 10, 10, 10)).format('MMMM Do YYYY h:mm:ss a')],
        verdictList = ['pass', 'fail','aborted', 'errored', 'passed with warnings', 'running'],
        ownerList = ['aaaAAA', 'bbbBBB','aaaAAA', 'bbbBBB','aaaAAAAAAAA', 'bbbBBBB','aaaAAAAAA', 'bbbBBBBBB',
            'aaaAAAA', 'bbbBBBBBBBB'],
        statusList = ['running', 'completed', 'pending resources', 'execution failed', 'schedules', 'processing data', 'inconclusive'];



    function createRandomItem() {
        var
            Name = nameList[Math.floor(Math.random() * 3)],
            Technology = technologyList[Math.floor(Math.random() * 9)],
            Program = programList[Math.floor(Math.random() * 2)],
            CycleType = cycleTypeList[Math.floor(Math.random() * 2)],
            TestBed = testBedsList[Math.floor(Math.random() * 3)],
            Owner = ownerList[Math.floor(Math.random() * 2)],
            CreatedTime = createdtimeList[Math.floor(Math.random() * 1)],
            Status = statusList[Math.floor(Math.random() * 7)],
            Verdict = verdictList[Math.floor(Math.random() * 6)];

        return {
            Name: Name,
            Technology: Technology,
            Program: Program,
            CycleType: CycleType,
            TestBed: TestBed,
            Owner: Owner,
            CreatedTime: CreatedTime,
            Status: Status,
            Verdict: Verdict
        };
    }

    $scope.NameOptions = nameList;
    $scope.TechnologyOptions = technologyList;
    $scope.ProgramOptions = programList;
    $scope.CycleTypeOptions = cycleTypeList;
    $scope.TestBedOptions = testBedsList;
    $scope.OwnerOptions = ownerList;
    $scope.CreatedTimeOptions = createdtimeList;
    $scope.StatusOptions = statusList;
    $scope.VerdictOptions = verdictList;



    $scope.tags = []

    $scope.itemsByPage = 15;

    $scope.rowCollection = [];
    for (var j = 0; j < 30; j++) {
        item = createRandomItem();
        if((item.Status != 'completed' && (item.Verdict == 'pass' || item.Verdict == 'fail') )|| (item.Verdict == 'running' && (item.Status == 'completed' || item.Status == 'execution failed')))
            continue;
        $scope.rowCollection.push(item);
    }
    $scope.rowCollection[0].Verdict = 'running';
    $scope.rowCollection[0].status = 'running';
    $scope.rowCollection[1].Verdict = 'pass';
    $scope.rowCollection[1].status = 'completed';
    $scope.rowCollection[3].Verdict = 'pass';
    $scope.rowCollection[3].status = 'completed';
    $scope.rowCollection[4].Verdict = 'pass';
    $scope.rowCollection[4].status = 'completed';
    $scope.rowCollection[5].Verdict = 'running';
    $scope.rowCollection[5].status = 'running';


    //$scope.completed = [
    //    {label: "Completed", value: perOfCompleted($scope.rowCollection), color: "#337ab7", suffix: "%"}
    //];
    //$scope.failed = [
    //    {label: "Failed", value: perOfPassed($scope.rowCollection), color: "#FF0000", suffix: "%"}
    //];
    //
    //$scope.options1 = {thickness: 2, mode: "gauge", total: 15};
    //
    //$scope.options2 = {thickness: 5, total: 100};
    //
    //$scope.completed = [
    //    {label: "Completed", value: 11, color: "#6B8E23"},
    //    {label: "Running", value: 22, color: "#4169E1"},
    //    {label: "Pending", value: 33, color: "#FF8C00"}
    //];


    //$scope.singleModel = 1;





    // collapsible panels

    //$scope.toggleState = 'Toggle Statistics';
    //
    //$scope.isCollapsedStatistics = true;
    //$scope.$watch($scope.isCollapsedStatistics, function() {
    //    if ($scope.isCollapsedStatistics == true) {
    //        $scope.toggleState = 'Untoggle Statistics';
    //    }
    //    else{
    //        $scope.toggleState = 'Toggle Statistics';
    //    }
    //});
    //
    //$scope.isCollapsedFiltering = false;



    $scope.searchPlaceholder = 'Global Search';
    $scope.searchByType = '';

    //$scope.nameSearch = function(){
    //    $scope.searchPlaceholder = 'Name Search';
    //    $scope.searchByType = 'Name';
    //}
    //
    //$scope.ownerSearch = function(){
    //    $scope.searchPlaceholder = 'Owner Search';
    //    $scope.searchByType = 'Owner';
    //}
    //
    //$scope.testBedSearch = function(){
    //    $scope.searchPlaceholder = 'Test Bed Search';
    //    $scope.searchByType = 'TestBed';
    //}
    //
    //$scope.globalSearch = function(){
    //    $scope.searchPlaceholder = 'Global Search';
    //    $scope.searchByType = '';
    //}



    $scope.allSelected = false;

    $scope.selectUnselectAll = function () {

        if($scope.allSelected){ //unselect all
            for (var i = 0; i < $scope.rowCollection.length; i++) {
                var row = $scope.rowCollection[i];
                row.isSelected = false;
            }
            $scope.allSelected = false;
            $scope.selectUnselectString = 'Select All';
        }
        else {
            for (var i = 0; i < $scope.rowCollection.length; i++) {
                var row = $scope.rowCollection[i];
                row.isSelected = true;
            }
            $scope.allSelected = true;
            $scope.selectUnselectString = 'Unselect All';
        }

    };

    $scope.selectUnselectString = 'Select All';



    $scope.QueueButtonOff = false;
    $scope.RerunButtonOff = false;
    $scope.ReportButtonOff = false;
    $scope.ExecutionButtonOff = false;
    $scope.CancelButtonOff = false;
    $scope.DesktopButtonOff = false;



    //$scope.$watch('rowCollection', function(rows) {
    //
    //    for (var i = 0; i < $scope.rowCollection.length; i++) {
    //        var row = $scope.rowCollection[i];
    //        if(row.isSelected == true) {
    //            $location.path('/queue');
    //        }
    //    }
    //
    //});



    $scope.queue = function(){

        for (var i = 0; i < $scope.rowCollection.length; i++) {
            var row = $scope.rowCollection[i];
            if(row.isSelected == true) {
                $location.path('/queue');
            }
        }
        //$scope.QueueButtonOff = true;
    };


    $scope.cancel = function(size){
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl'
        });
    };


    //console.log(createdtimeList[0].format('YYYY MM DD'));

    console.log(moment())


    $scope.dates = {startDate: moment(), endDate: moment()};



    //$scope.$watch('dates', function() {
    //    // get selected row
    //    //$scope.dates.startDate = null;
    //    //$scope.dates.endDate = null;
    //    console.log($scope.dates)
    //}, true);



    $scope.isRowVerdictFailed = function(row){

        if (row.Verdict == 'fail')
            return true;
        else
            return false;

    };

    $scope.colorVerdict = function (val) {

        if (val == 'pass' || val == 'passed with warnings')
            return 'label label-success';

        else if(val == 'fail' || val == 'errored' )
            return 'label label-danger';

        else if(val == 'aborted')
            return 'label label-warning';

        else
            return '';
    }

    $scope.colorStatus = function (val) {

        if (val == 'running')
            return 'label label-default';

        else
            return '';
        //else if(val == 'cancelled' || val == 'execution failed' ||  val == 'Failed to acquire test-bed')
        //    return 'label label-warning';
        //
        //else
        //    return 'label label-info';
    }


    $scope.sortByTime = function(){
        $timeout(function() {
            var el = document.getElementById('createdTimeTr');
            angular.element(el).triggerHandler('click');
            angular.element(el).triggerHandler('click');
        }, 0);


    }

}]);