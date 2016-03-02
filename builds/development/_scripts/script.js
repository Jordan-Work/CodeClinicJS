//(function(){
//  'use strict';
//
//  function createTable(source, target) {
//    var ajaxRequest = new XMLHttpRequest();
//    var tableRows, tableData, output, targetNode;
//
//    targetNode = document.querySelector(target);
//
//    ajaxRequest.onload = function(e) {
//      tableRows = e.target.responseText.split('\r');
//      output = '<table>';
//
//      for (var row = 0; row < tableRows.length; row++) {
//        tableData = tableRows[row].split(',');
//        output += '<tr>';
//
//        for (var cell = 0; cell < tableData.length; cell++) {
//          if (row===0) {
//            output += '<th>' + tableData[cell] + '</th>';
//          } else {
//            output += '<td>' + tableData[cell] + '</td>';
//          } // row 0?
//        } //go through cells
//        output += '</tr>';
//      } //go through rows
//      output += '</table>';
//      targetNode.innerHTML = output;
//    }; // on load
//
//    ajaxRequest.open('GET', source, true);
//    ajaxRequest.responseType = 'text';
//    ajaxRequest.send();
//
//  }
//
//  createTable('_assets/first_semester.csv', '#one');
//  createTable('_assets/second_semester.csv', '#two');
//})();


var chart = c3.generate({
  data: {
    columns: [
      ['data1', 30, 200, 100, 400, 150, 250],
      ['data2', 130, 100, 140, 200, 150, 50]
    ],
    type: 'bar'
  },
  bar: {
    width: {
      ratio: 0.5 // this makes bar width 50% of length between ticks
    }
    // or
    //width: 100 // this makes bar width 100px
  }
});

setTimeout(function () {
  chart.load({
    columns: [
      ['data3', 130, -150, 200, 300, -200, 100]
    ]
  });
}, 1000);
generate(,1)