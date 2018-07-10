'use strict'

agGrid.initialiseAgGridWithAngular1(angular);

var module = angular.module("quoteboardGrid", ["agGrid"]);



module.controller("quoteboardGridCtrl", [ '$scope', 'mainFactory', function($scope, mainFactory){
  $scope.symbolName = '';
  
  $scope.gridOptions = mainFactory.get();

  $scope.addNewRow = function(symbolName){
    mainFactory.addRow(symbolName); 
  };

}]);

module.service('mainFactory', [ '$interval' , function($interval) {
    var minPrice = 100,
        maxPrice = 10000,
        rowData = [];

    var columnDefs = [
        {headerName: "Symbol", field: "symbol"},
        {headerName: "Last", field: "last"},
        {headerName: "Change", field: "change"},
        {headerName: "High", field: "high"},
        {headerName: "Low", field: "low"}
    ];

    var gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
        angularCompileRows: true,
        enableFilter: true,
        enableSorting: true,
        rowHeight: 35
    };

    for (var i = 0; i < 4; i++) {
        addRow();
    }
    

    function generateDataForNewRow(symbolName){
        var newPrice = generateRandomNumber(minPrice, maxPrice);

        return {
            symbol: symbolName ? symbolName : Math.random().toString(36).substring(7),
              last: newPrice, 
            change: newPrice, 
              high: newPrice, 
               low: newPrice
        };
    }

    function changeData(row) {
        var price = generateRandomNumber(minPrice, maxPrice);

        if(price < row.low){
            row.low = price;
        }

        if(price > row.high){
            row.high = price;
        }


        row.change = (row.last - price).toFixed(2);
        row.last = price;

        return row;


    }

    function generateRandomNumber(min, max){
        return +( Math.random()* ( min - max + 1) + max ).toFixed(2);
    }    
    
    function addRow(symbolName){
        rowData.push(generateDataForNewRow(symbolName));
    }

    $interval(function() {
        var countUpdatesRow = Math.floor(Math.random() * rowData.length);
        changeData(rowData[countUpdatesRow]);
        gridOptions.api.setRowData(rowData);
    }, 1000);

    this.get = function () {
        return gridOptions;
    };

    this.addRow = function (symbol) {
        addRow(symbol);
    };

}]);