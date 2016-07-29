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





    var datePicker1 = '#datepicker1';
    var datePicker2 = '#datepicker2';
    linkedDP(datePicker1,datePicker2);



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

    function generateChart (data,style){
        var chart = c3.generate({
            data:{
                x:'x',
                columns: data,
                type:style,

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



var startDate;
var endDate;

    function loadChart(sD,eD) {
        $.ajax({
            url: 'http://foundationphp.com/phpclinic/podata.php?&raw&callBack=?',
            jsonpCallback: 'jsonReturnData',
            dataType: 'jsonp',
            data:{
                startDate:sD,
                endDate:eD,
                format: 'json'
            },
            success: function (response){
                console.log(processData(response));
                generateChart(processData(response),chartStyle);
            }//success
        }); //AJAX Call
    }//load chart


    function datePass(stDate,enDate) {
        //clicked +=1;
        var startMod = new Date(stDate);
        var endMod = new Date(enDate);
        //start mods
        var sMth;
         if (startMod.getUTCMonth() < 10) {
             sMth = ('0' + (startMod.getUTCMonth() + 1));
        }else {
             sMth = (startMod.getUTCMonth() + 1);
         }
        var sDay;
        if (startMod.getUTCDate() < 10) {
            sDay = ('0' + startMod.getUTCDate());
        }else {
            sDay = startMod.getUTCDate();
        }

        var sYear = startMod.getUTCFullYear();
        //end mods
        var eMth;

        if ((endMod.getUTCMonth() + 1) < 10 ) {
            eMth = ('0' + (endMod.getUTCMonth() + 1));
        }else {
            eMth = (endMod.getUTCMonth() + 1);
        }
        var eDay;

        if (endMod.getUTCDate() < 10 ) {
            eDay = ('0' + endMod.getUTCDate());
        }else {
            eDay = endMod.getUTCDate();
        }
        var eYear = endMod.getUTCFullYear();

        var sDateFormated = ''+sYear + '' + sMth+ '' +''+ sDay ;
        var eDateFormated = ''+eYear + '' + eMth+ '' +''+ eDay;
        if (startDate.getUTCFullYear() >= 2016){
            var chartElement= $( "#chart");

            //loadChart('20150301','20150302');
            chart.innerHTML = "Please Pick a More Recent Date";
            //chartElement.style. =
        }
        loadChart(sDateFormated, eDateFormated);

        console.log(sDateFormated, eDateFormated);

    }

    function linkedDP(dp1, dp2){

        var nowTemp = new Date();
        var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
        var checkin = $(dp1).datepicker({
            onRender: function (date) {
                //add inital date load
                return date.valueOf() >= now.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function (ev) {
            // if (ev.date.valueOf() > checkout.date.valueOf()) {
            var newStartDate = new Date(ev.date);
            startDate = newStartDate;
            newStartDate.setDate(newStartDate.getDate() + 1);
            checkout.setValue(newStartDate);

            // }
            checkin.hide();

            $(dp2)[0].focus();
        }).data('datepicker');
        //dp2 function
        var checkout = $(dp2).datepicker({
            onRender: function (date) {
                return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function (ev) {

            endDate =  new Date(ev.date);
            datePass(startDate,endDate);
            checkout.hide();
        }).data('datepicker');
    }


    if (startDate == null && endDate == null) {
        loadChart('20150301','20150401');
    }


    var chartStyle = 'bar';
    //styleFilter.onClick = function() {
    var barButton = document.getElementById('btn-0');
    var areaButton = document.getElementById('btn-1');
    var lineButton = document.getElementById('btn-2');

    barButton.addEventListener('click', function() {
        chartStyle = 'bar';
        if (startDate != null && endDate != null){
        datePass(startDate,endDate);
        }else{
            loadChart('20150301','20150401');
        }
    }, false);

    areaButton.addEventListener('click', function() {
        chartStyle = 'area';
         if (startDate != null && endDate != null){
        datePass(startDate,endDate);
         }else{
             loadChart('20150301','20150401');
        }
    }, false);

    lineButton.addEventListener('click', function() {
        chartStyle = 'line';
         if (startDate != null && endDate != null){
        datePass(startDate,endDate);
         }else {
             loadChart('20150301','20150401');
         }
    }, false);








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