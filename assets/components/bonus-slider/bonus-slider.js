class BonusSlider extends HTMLElement {
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
             div.classList.add("big-carry");
             div.innerHTML = xhr.responseText;
             self.appendChild(div); 
          }
      };      
      xhr.open('GET', 'assets/components/bonus-slider/bonus-slider.html');
      xhr.send();
    }
  }

function inputChangeSlider(data){
var bonusSlider = document.getElementById("bonusRate");
bonusSlider.value = data.value;
var table = document.getElementById("accounting-table");
var body = table.getElementsByTagName('tbody')[0];

    for (var i =0; i <  body.rows.length; i++)
    {
        if(parseFloat(body.children[i].children[6].innerHTML)>data.value)
        {
            body.children[i].style.display = "none";
        }
        else
        {
            body.children[i].style.display = "table-row"; 
        }
    }
}

function sliderChangeInput(data){
var bonusValue = document.getElementById("bonusInputValue");
bonusValue.value = data;

    var table = document.getElementById("accounting-table");
    var body = table.getElementsByTagName('tbody')[0];

    for (var i =0; i <  body.rows.length; i++)
    {
        if(parseFloat(body.children[i].children[6].innerHTML)>data)
        {
            body.children[i].style.display = "none";
        }
        else
        {
            body.children[i].style.display = "table-row"; 
        }
    }
}

  customElements.define('bonus-slider', BonusSlider);