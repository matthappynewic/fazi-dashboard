function FillTable(data, tableId)
{
    var table = document.getElementById(tableId);
    var headElements = table.getElementsByClassName("headElement");
    var body = table.getElementsByTagName('tbody')[0];

    var a = tableId;
    for (var i =0; i < body.rows.length; i++)
    {
        if (body.children[i].childNodes.length > 1) {
            // remove old but first cells
            while (body.children[i].childNodes.length > 2) {
                body.children[i].removeChild(body.children[i].lastChild);
            }
        }

        for (var j = 0; j < headElements.length; j++)
        {
            var value = data[headElements[j].innerHTML][body.children[i].className];
            var cell = document.createElement('td');
            cell.innerHTML = value;
            body.children[i].appendChild(cell);
        }
    }
}

function FillJackpotTable(data)
{
    var table = document.getElementById("jackpots-table");
    var headElements = table.getElementsByClassName("headElement");
    var body = table.getElementsByTagName('tbody')[0];

    body.innerHTML = "";

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
}
var data;
var selectedJackpot = 'Platinum';

(function() {
    readTextFile("assets/json/dashboard.json", function(text) {
        data = JSON.parse(text);
        
        RenderDashboardTable();
        RenderTables("EUR");
    });
})();

function RenderJackpotTable(selectedCurrency) {
    var allJackpots = data.result.jackpots[selectedJackpot].dashboardJackpots;
    var jackotsInSelectedCurrency = [];

    for (var i in allJackpots)
    {
        if (allJackpots[i].portalName == "Portal-" + selectedCurrency)
        {
            jackotsInSelectedCurrency.push(allJackpots[i]);
        }
    }

    FillJackpotTable(jackotsInSelectedCurrency);
};

function RenderPortalsTable(selectedCurrency)
{   
    FillTable(data.result.portalsActivities["Portal-" + selectedCurrency].activities, "portals-table");

}

function RenderDashboardTable()
{
    FillTable(data.result.portalsActivities.activities, "dashboard-table");
}

function RenderTables(selectedCurrency)
{
    RenderJackpotTable(selectedCurrency);
    RenderPortalsTable(selectedCurrency);
}

function SearchPortals(input)
{
    var table = document.getElementById("portals-table");
    var body = table.getElementsByTagName('tbody')[0];

    for (var i =0; i <  body.rows.length; i++)
    {
        if(!body.children[i].children[0].innerHTML.toLowerCase().includes(input.toLowerCase()))
        {
            body.children[i].style.display = "none";
        }
        else
        {
            body.children[i].style.display = "table-row"; 
        }
    }
}