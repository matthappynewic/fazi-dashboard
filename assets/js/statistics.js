function FillGameStatisticsTable(data,sum)
{
    var table = document.getElementById("games-summary-table");
    var headElements = table.getElementsByClassName("headElement");
    var body = table.getElementsByTagName('tbody')[0];
    body.innerHTML = "";
    var cellWidths = [];
    
    for (var i = 0; i <  data.length; i++)
    {
        var row = document.createElement('tr');

        for (var j = 0; j < headElements.length; j++)
        {
            var value = data[i][headElements[j].id];

            var cell = document.createElement('td');
            cell.innerHTML = value;
            row.appendChild(cell);
        }

        body.appendChild(row);
    }

    //And add sum at the bottom
    
    var row = document.createElement('tr');
    row.classList.add("last-row-sum");

        for (var j = 0; j < headElements.length; j++)
        {
            var value = sum[headElements[j].id];

            var cell = document.createElement('td');
            cell.innerHTML = value;
            row.appendChild(cell);
        }
        
        var tfoot;
        var footer = document.getElementsByTagName('tfoot');
        if (footer[0] == null)
        {
            tfoot = document.createElement('tfoot');
            table.appendChild(tfoot);
        }
        else
        {   
            tfoot = table.getElementsByTagName('tfoot')[0];
            tfoot.innerHTML = "";
        }
        
        tfoot.appendChild(row);
        document.getElementsByClassName('last-row-sum')[0].children[0].innerHTML="SUM";
}

var data;
(function() {
    //usage:
    readTextFile("assets/json/statistic-games-summary.json", function(text){
        data = JSON.parse(text);

        RenderGameStatisticsTable();

        FillGameStatisticsTable(data.result.gameStatisticsPerGame, data.result.gameStatisticsSum);
    });
 })();

 function formatDate(date) {
                  
    var day = date.getDate();
    var monthIndex = date.getMonth()+1;
    var year = date.getFullYear();
  
    return day + '/' + monthIndex + '/' + year;
  }

 var selectedDateFrom = null, selectedDateTo = null;
 var selectedCurrency = "EUR";
 var helper = 0;

 function RenderGameStatisticsTable() {
    var sum = data.result.gameStatisticsSum;
    var filters = selectedDateFrom != null || selectedDateTo != null || selectedCurrency != '';

    if (filters)
    {
        games = data.result.operaterGamesStatistics;
        var gameNames = Object.keys(games);

        var filteredData = [];
        for (var i in gameNames)
        {
            var record = new Object();
            record["totalBet"] = 0;
            record["totalWin"] = 0;
            record["rounds"] = 0;
            record["jackpotValue"] = 0;
            record["result"] = 0;
            record["payout"] = 0;
            record["currency"] = selectedCurrency;
            record["gameName"] = gameNames[i];

            var rowsToRender = [];

            
            for (var j in games[gameNames[i]])
            {
                var z = 0;
                // filter currency
                if (games[gameNames[i]][j]["currency"] != selectedCurrency)
                {
                    continue;
                }
               
                // remove older
                if (selectedDateFrom != null && helper==0) {
                    oldFrom = selectedDateFrom;
                    var wholeDate = new Date(games[gameNames[i]][j]["period"]);
                    var dd= wholeDate.getDate();
                    var mm = wholeDate.getMonth()+1; 
                    var yyyy = wholeDate.getFullYear();

                    var newWhole = new Date(yyyy, dd-1, mm+1, 0, 0, 0, 0);

                    var datesFromArray = selectedDateFrom.split('/');
                    var ddfrom = datesFromArray[0];
                    var mmfrom = datesFromArray[1]-1;
                    var yyyyfrom = datesFromArray[2];

                    var newFrom = new Date(yyyyfrom, mmfrom, ddfrom, 0, 0, 0, 0);

                    if (newWhole > newFrom)
                    {
                        rowsToRender.push(games[gameNames[i]][j]);
                        continue;
                    }
                }

                // remove newer
                if (selectedDateTo != null && helper==1)
                {
                    var wholeDate = new Date(games[gameNames[i]][j]["period"]);
                    var dd= wholeDate.getDate();
                    var mm = wholeDate.getMonth(); 
                    var yyyy = wholeDate.getFullYear();

                    var newWhole = new Date(yyyy, dd-1, mm, 0, 0, 0, 0);

                    var datesToArray = selectedDateTo.split('/');
                    var ddto = datesToArray[0];
                    var mmto = datesToArray[1];
                    var yyyyto = datesToArray[2];

                    var newTo = new Date(yyyyto, mmto-1, ddto, 0, 0, 0, 0);

                    if (newWhole < newTo)
                    {
                        rowsToRender.push(games[gameNames[i]][j]);
                        continue;
                    }
                }
                
            }



            // SUM data
            for(var j in rowsToRender)
            {
                record["totalBet"] += rowsToRender[j]["totalBet"];
                record["totalWin"] += rowsToRender[j]["totalWin"];
                record["rounds"]+= rowsToRender[j]["rounds"];
                record["jackpotValue"] += rowsToRender[j]["jackpotValue"];
                record["result"] += rowsToRender[j]["result"];
                record["payout"] += rowsToRender[j]["payout"];
            }
            // round values
            record["totalBet"] = Math.round(record["totalBet"] * 100) / 100
            record["totalWin"] = Math.round(record["totalWin"] * 100) / 100
            record["rounds"] = Math.round(record["rounds"] * 100) / 100
            record["jackpotValue"] = Math.round(record["jackpotValue"] * 100) / 100
            record["result"] = Math.round(record["result"] * 100) / 100
            record["payout"] = Math.round(record["payout"] * 100) / 100

            if (rowsToRender.length > 0)
            {
                filteredData.push(record);
            }
        }

        sum = new Object();
        sum["totalBet"] = 0;
        sum["totalWin"] = 0;
        sum["rounds"] = 0;
        sum["jackpotValue"] = 0;
        sum["result"] = 0;
        sum["payout"] = 0;
        sum["currency"] = selectedCurrency;
        sum["gameName"] = gameNames[i];

        for(var j in filteredData)
            {
                sum["totalBet"] += filteredData[j]["totalBet"];
                sum["totalWin"] += filteredData[j]["totalWin"];
                sum["rounds"]+= filteredData[j]["rounds"];
                sum["jackpotValue"] += filteredData[j]["jackpotValue"];
                sum["result"] += filteredData[j]["result"];
                sum["payout"] += filteredData[j]["payout"];
            }
            // round values
            sum["totalBet"] = Math.round(sum["totalBet"] * 100) / 100
            sum["totalWin"] = Math.round(sum["totalWin"] * 100) / 100
            sum["rounds"] = Math.round(sum["rounds"] * 100) / 100
            sum["jackpotValue"] = Math.round(sum["jackpotValue"] * 100) / 100
            sum["result"] = Math.round(sum["result"] * 100) / 100
            sum["payout"] = Math.round(sum["payout"] * 100) / 100

        FillGameStatisticsTable(filteredData, sum);
    }
    else
    {
        FillGameStatisticsTable(rowsToRender, sum);
    }
 }

 function ChangeFromDate(date) {
    selectedDateFrom = date;
    helper = 0;
    RenderGameStatisticsTable();
 }

 function ChangeToDate(date) {
    selectedDateTo = date;
    helper = 1;
    RenderGameStatisticsTable();
 }

 function ChangeCurrency(currency) {
     selectedCurrency = currency;
     RenderGameStatisticsTable();
 }

 function pickThisPeriod(value){
    var period = value.children[0].innerHTML.toUpperCase();
    selectedDateTo = formatDate(new Date());
    var d = new Date(); // for date object manipulation
    var x = 0;
    if(period== "TODAY"){
        selectedDateFrom = selectedDateTo;
    }
    if(period == "YESTERDAY"){
        x=1;
        d.setDate(d.getDate() - x);
        selectedDateFrom=formatDate(d);
    }
    if(period == "LAST THREE DAYS"){
        x=3;
        d.setDate(d.getDate() - x);
        selectedDateFrom=formatDate(d);
    }

    if(period == "LAST WEEK"){
        x=7;
        d.setDate(d.getDate() - x);
        selectedDateFrom=formatDate(d);
    }

    if(period == "LAST MONTH"){
        x=30;
        d.setDate(d.getDate() - x);
        selectedDateFrom=formatDate(d);
    }
    if(period == "LAST QUARTER"){
        x=90;
        d.setDate(d.getDate() - x);
        selectedDateFrom=formatDate(d);
    }
    if(period == "LAST YEAR"){
        x=365;
        d.setDate(d.getDate() - x);
        selectedDateFrom=formatDate(d);
    }
    helper = 0;
    RenderGameStatisticsTable();
 }
