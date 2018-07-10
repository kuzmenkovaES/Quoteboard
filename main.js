agGrid.initialiseAgGridWithAngular1(angular);

var module = angular.module("example", ["agGrid"]);

module.controller("exampleCtrl", function($scope, $interval) {

    var columnDefs = [
        {headerName: "Symbol", field: "symbol"},
        {headerName: "Last", field: "last"},
        {headerName: "Change", field: "change"},
        {headerName: "High", field: "high"},
        {headerName: "Low", field: "low"}
    ];

    var rowData = [
        {symbol: "AAPL", last: "173.00", change: "-1.26", high: 999, low: 66},
        {symbol: "ESH8", last: "2720.50", change: "-2.75", high: 999, low: 66},
        {symbol: "NQH8", last: "6897.50", change: "-20.57", high: 999, low: 66},
        {symbol: "CLK8", last: "54.01", change: "+1.13", high: 999, low: 66}
    ];

    $scope.gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
        angularCompileRows: true,
        enableFilter: true,
        enableSorting: true,
        rowHeight: 35
    };
    $scope.symbolName = '';
    $scope.addNewRow = function(symbolName){
        rowData.push(generateDAtaForNewRow({symbol: symbolName, last: 1, change: "1", high: 1, low: 1}) );
        $scope.gridOptions.api.setRowData(rowData);
    }

    $interval(function() {
        let countUpdatesRow = Math.floor(Math.random() * rowData.length);
        changeDate(rowData[countUpdatesRow]);
        $scope.gridOptions.api.setRowData(rowData);
    }, 1000);

    function generateRandomNumber(oldValue){
        let number =  (Math.random()*(oldValue*rowData.length + 1)).toFixed(2);
        return number;
    }
    function generateDAtaForNewRow(row){
        row.last = generateRandomNumber(row.last);
        row.change = generateRandomNumber(row.change);
        row.high = generateRandomNumber(row.high);
        row.low = generateRandomNumber(row.low);
        return row;
    }
    function changeDate(row) {
        // console.log(row);
        console.clear();
        row.change = generateRandomNumber(row.change);

        let oldLast = row.last*1;
        let newChange = row.change*1;
        row.last = (oldLast + newChange).toFixed(2);

        return row;


    }

});