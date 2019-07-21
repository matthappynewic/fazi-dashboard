class DeductionSlider extends HTMLElement {
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
      xhr.open('GET', 'assets/components/deduction-slider/deduction-slider.html');
      xhr.send();
    }
  }

function inputChangeSliderDed(data){
var deductionSlider = document.getElementById("deductionRate");
deductionSlider.value = data.value;
}

function sliderChangeInputDed(data){
var deductionInputValue = document.getElementById("deductionInputValue");
deductionInputValue.value = data;
}

customElements.define('deduction-slider', DeductionSlider);