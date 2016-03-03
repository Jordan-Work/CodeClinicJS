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








$(function(){
    'use strict';
  //  $('#datepicker1').datepicker('show');

    //date pickers
    //var nowTemp = new Date();
    //var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    //
    //var checkin = $('#datepicker1').datepicker({
    //    onRender: function(date) {
    //        return date.valueOf() < now.valueOf() ? 'disabled' : '';
    //    }
    //}).on('changeDate', function(ev) {
    //    if (ev.date.valueOf() > checkout.date.valueOf()) {
    //        var newDate = new Date(ev.date)
    //        newDate.setDate(newDate.getDate() + 1);
    //        checkout.setValue(newDate);
    //    }
    //    checkin.hide();
    //    $('#dpd2')[0].focus();
    //}).data('datepicker');
    //var checkout = $('#dpd2').datepicker({
    //    onRender: function(date) {
    //        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
    //    }
    //}).on('changeDate', function(ev) {
    //    checkout.hide();
    //}).data('datepicker');
    //






    //Mean Calc
    function getMean(myArray){
        var mean = myArray.reduce( function (a,b){
            return a+b;
        })/myArray.length;
        return mean.toFixed(2);
    }//get mean

    function  getMedian (myArray){
        var median;
        var sorted = myArray.sort(myArray);
        var meadianIndex = Math.floor(myArray.length/2);

        if (sorted.length % 2 === 0){
            var meadA = sorted[meadianIndex];
            var meadB = sorted[meadianIndex-1];
            median = (meadA + meadB)/2;
        }else {
            median = myArray[meadianIndex];
        }
        return median.toFixed(2);
    } //get median


    function processData(data){
        var myData = [];
        var myDate = ['x'];
        var medianTEMP = ['medianTemperature'];
        var meanTEMP = ['meanTemperature'];
        var medianPress = ['medianPressure'];
        var meanPress = ['meanPressure'];
        var medianSpeeds = ['medianSpeed'];
        var meanSpeeds = ['meanSpeed'];

        for (var key in data){
            if (data.hasOwnProperty(key) ){
                if ((data[key].t !== null) &&
                    (data[key].p !== null) &&
                    (data[key].s !== null)){
                    myDate.push(key);
                    meanTEMP.push(getMean(data[key].t));
                    medianTEMP.push(getMedian(data[key].t));
                    meanPress.push(getMean(data[key].s));
                    medianPress.push(getMedian(data[key].s));
                    meanSpeeds.push(getMean(data[key].p));
                    medianSpeeds.push(getMedian(data[key].p));
                }//if not null
            } //has a key
        }//for loop

        myData.push(myDate,meanTEMP, medianTEMP, meanPress, medianPress, meanSpeeds, medianSpeeds);
        return myData;
    }//processData


    ///toggles, line => area , bar => bar , pie = > pie with toggles through date selection pagination

    function generateChart (data){
        var chart = c3.generate({
            data:{
                x:'x',
                columns: data,
                type:'area',
                groups: [
                            ['medianTemperature','meanTemperature','medianPressure,meanPressure','medianSpeed','meanSpeed']
                        ],
                bar:{
                    ratio:0.9
                }
            },
            axis:{
                x:{
                    type: 'timeseries'
                },
                tick:{
                    format:'%Y-%m-%d'
                }
            },
            subchart:{
                show:true
            }

        });
    }

    function loadChart() {
        $.ajax({
        url: 'http://foundationphp.com/phpclinic/podata.php?&raw&callBack=?',
        jsonpCallback: 'jsonReturnData',
        dataType: 'jsonp',
        data:{
            startDate:20150305,
            endDate:20150326,
            format: 'json'
        },
        success: function (response){
            console.log(processData(response));
            generateChart(processData(response));
        }//success
    }) //AJAX Call
    }//load chart
    loadChart();





});//Page Loaded



//
//var chart = c3.generate({
//  data: {
//    columns: [
//      ['data1', 30, 200, 100, 400, 150, 250],
//      ['data2', 130, 100, 140, 200, 150, 50]
//    ],
//    type: 'bar'
//  },
//  bar: {
//    width: {
//      ratio: 0.5 // this makes bar width 50% of length between ticks
//    }
//    // or
//    //width: 100 // this makes bar width 100px
//  }
//});
//
//setTimeout(function () {
//  chart.load({
//    columns: [
//      ['data3', 130, -150, 200, 300, -200, 100]
//    ]
//  });
//}, 1000);
//generate(,1)