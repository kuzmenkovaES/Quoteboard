'use strict'

agGrid.initialiseAgGridWithAngular1(angular);

var module = angular.module('quoteboardGrid', ['agGrid']);

module.controller('quoteboardGridCtrl', [ '$scope', '$interval', 'mainFactory', function($scope, $interval, mainFactory){
    $scope.symbolName = '';

    var columnDefs = [
        {headerName: 'Symbol', field: 'symbol'},
        {headerName: 'Last', field: 'last'},
        {headerName: 'Change', field: 'change'},
        {headerName: 'High', field: 'high'},
        {headerName: 'Low', field: 'low'}
    ];

    $scope.gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
        angularCompileRows: true,
        enableFilter: true,
        enableSorting: true,
        rowHeight: 35,
        onGridReady: function(params) {params.api.sizeColumnsToFit();}
    };
  
    var rowData = mainFactory.get();

    $scope.addNewRow = function(){
        mainFactory.addRow($scope.symbolName);
    };

    $interval(function() {
        mainFactory.setDataForInterval();
        $scope.gridOptions.api.setRowData(rowData);
    }, 800);

}]);
module.service('mainFactory', function() {
    var minPrice = 100,
        maxPrice = 5000,
        rowData = [];   

    for (var i = 0; i < 4; i++) {
        addRow();
    }

    function generateDataForNewRow(symbolName){
        var newPrice = generateRandomNumber(minPrice, maxPrice);
        var row = {
            symbol: symbolName ? symbolName :  Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
              last: newPrice < 1 ? 0 : newPrice, 
            change: newPrice, 
              high: newPrice, 
               low: newPrice
        };
        return row;
    }

    function changeData(row) {
        var price = generateRandomNumber(minPrice, maxPrice);
        var newRow = {
               low: price < row.low ? price : row.low,
              high: price > row.high ? price : row.high,
            change: (row.last - price).toFixed(2),
              last: price < 1 ? 0 : price
        };
        return Object.assign(row, newRow);
    }

    function generateRandomNumber(min, max){
        return +( Math.random()* ( max - min + 0.87)).toFixed(2);
    }    
    
    function addRow(symbolName){
        rowData.push(generateDataForNewRow(symbolName));
    }

    this.get = function () {
        return rowData;
    };

    this.addRow = function (symbol) {
        addRow(symbol);
    };

    this.setDataForInterval = function () {
        var countUpdatesRow = Math.floor(Math.random() * rowData.length);
        changeData(rowData[countUpdatesRow]);
    };
});