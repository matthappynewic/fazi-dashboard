function FillAccountingTable(data,sum)
{
    var table = document.getElementById("accounting-table");
    var headElements = table.getElementsByClassName("headElement");
    var body = table.getElementsByTagName('tbody')[0];

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

    //and add sum at the bottom

    var row = document.createElement('tr');
    row.classList.add("last-row-sum");

        for (var j = 0; j < headElements.length; j++)
        {
            var value = sum[headElements[j].id];

            var cell = document.createElement('td');
            cell.innerHTML = value;
            row.appendChild(cell);
        }

        var tfoot = document.createElement('tfoot');
        tfoot.appendChild(row);
        table.appendChild(tfoot);
}

var selectedAccounting = 'Slot';

(function() {
    //usage:
    readTextFile("assets/json/accounting-reports.json", function(text){
        var data = JSON.parse(text);
        var sum = data.result.slotAccountingSum;
        document.getElementById('operatorN').innerHTML = "Operator Name: " + data.result.operatorName;
        document.getElementById('casinoC').innerHTML = "Casino Currency: " + data.result.casinoCurrency;
        document.getElementById('period').innerHTML = "Period: " + data.result.period;
        FillAccountingTable(data.result.slotAccounting,sum);
    });
 })();
