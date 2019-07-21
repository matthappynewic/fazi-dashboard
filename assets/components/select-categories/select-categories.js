class SelectCategories extends HTMLElement {
    constructor() {
      super();

      this.addEventListener('click', e => {
      });
    }

     // Called when element is inserted in DOM
    connectedCallback() {
      var self = this;
      var xhr = new XMLHttpRequest(); 
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) { 
             var div = document.createElement('div');
             div.classList.add("carry");
             div.innerHTML = xhr.responseText;
             self.appendChild(div); 
          }
      };      
      xhr.open('GET', 'assets/components/select-categories/select-categories.html');
      xhr.send();
    }
  }
  
function selectAll(data){
  var allChecked = document.getElementsByClassName("checkboxInput");
  if(data.checked){     
    for(var i = 0;i<allChecked.length;i++){
      allChecked[i].checked = true;
    }
  }
  else{
    for(var i = 0;i<allChecked.length;i++){
      allChecked[i].checked = false;
    }
  }
}

function alertMe(data){
  var result = "";
  var resultArray = [];
  var checkboxes = document.getElementsByClassName("simulateCheckbox");
  for(var i = 0; i<checkboxes.length;i++){
    var item = checkboxes[i].children[0].children[0];
    if(item.checked){
      result = result.concat(item.value + ",");
      resultArray.push(item.value);
    }
  }

  result = result.substring(0, result.length - 1);
  if(result.length>1){
    document.getElementById('selectedCategories').innerHTML = result;
  }
  else{
    document.getElementById('selectedCategories').innerHTML = "Select Categories";
  }

    var table = document.getElementById("games-summary-table");
    var body = table.getElementsByTagName('tbody')[0];
    var indexes = [];

    for (var i =0; i <  body.rows.length; i++)
    {
       if(body.children[i].children[0].innerHTML != "Roulette" && body.children[i].children[0].innerHTML != "Triple Crown" && body.children[i].children[0].innerHTML != "Jolly Poker" && body.children[i].children[0].innerHTML != "Live European Roulette")
        {
          indexes.push(i);
        }
    }

    for (var i =0; i <  body.rows.length; i++)
    {
        if(!resultArray.includes(body.children[i].children[0].innerHTML))
        {
            body.children[i].style.display = "none";
        }
        else
        {
            body.children[i].style.display = "table-row"; 
        }

        if(resultArray.length<1){
          body.children[i].style.display = "table-row";
        }
    }

      if(resultArray.includes('Slot')){
        for(var z = 0; z < indexes.length; z++){
          body.children[indexes[z]].style.display = "table-row"; 
        }
      }
}

  customElements.define('select-categories', SelectCategories);