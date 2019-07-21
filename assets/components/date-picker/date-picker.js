// Usage
// Place date-picker tag with rom and to callback function
// example: <date-picker onFromChange="" onToChange=""></date-picker>
//          function renderTable(selectedCurrency) {
//              // your code goes here
//          }
class DatePicker extends HTMLElement {
    constructor() {
      super();
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
             div.classList.add("period-carry");
             div.innerHTML = xhr.responseText;
             self.appendChild(div);
            
             var pickerFrom = document.getElementById('datepicker-from');
             var picker = new Pikaday({ field: pickerFrom,
             format: 'D/M/YYYY',
             toString(date, format) {
             // you should do formatting based on the passed format,
             // but we will just return 'D/M/YYYY' for simplicity
             const day = date.getDate();
             const month = date.getMonth() + 1;
             const year = date.getFullYear();
             return `${day}/${month}/${year}`;
            }, });

            var pickerTo = document.getElementById('datepicker-to');
            var picker = new Pikaday({ field: pickerTo,
                format: 'D/M/YYYY',
                toString(date, format) {
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            }, });

            var element = document.getElementsByTagName('date-picker')[0];
            pickerFrom.addEventListener('change', e => {
                var callback = element.getAttribute('onFromChange');
                // call function by name with params
                window[callback](e.srcElement.value);
            });

            pickerTo.addEventListener('change', e => {
                var callback = element.getAttribute('onToChange');
                // call function by name with params
                window[callback](e.srcElement.value);
            });
          }
      };      
      xhr.open('GET', 'assets/components/date-picker/date-picker.html');
      xhr.send();
    }
  }
  
  customElements.define('date-picker', DatePicker);