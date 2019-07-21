// Usage
// Place currency-picker tag with callback function set as 'callback' property
// example: <currency-picker callback="renderTable"/>
//          function renderTable(selectedCurrency) {
//              // your code goes here
//          }
class CurrencyPicker extends HTMLElement {
    constructor() {
      super();

      this.addEventListener('change', e => {
        console.log(e.srcElement.value);
        // callback function name (currency-picker is a grand parent of option element)
        var callback = e.srcElement.parentElement.parentElement.getAttribute('callback');
        // call function by name with params
        window[callback](e.srcElement.value);
      });
    }

     // Called when element is inserted in DOM
    connectedCallback() {
      var self = this;
      var xhr = new XMLHttpRequest(); 
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) { 
             var div = document.createElement('div');
             div.classList.add('select');
             div.innerHTML = xhr.responseText;
             self.appendChild(div);
          }
      };      
      xhr.open('GET', 'assets/components/currency-picker/currency-picker.html');
      xhr.send();
    }
  }
  
  customElements.define('currency-picker', CurrencyPicker);