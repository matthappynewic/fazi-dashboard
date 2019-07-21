class PeriodPicker extends HTMLElement {
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
             div.classList.add("positionCarry");
             div.innerHTML = xhr.responseText;
             self.appendChild(div);
          }
      };      
      xhr.open('GET', 'assets/components/period-picker/period-picker.html');
      xhr.send();
    }
  }

function pickTime(element){
  document.getElementById("simulateSelectTime").children[0].innerHTML = element.innerHTML;           
  element.parentElement.style.display= "none";
  element.parentElement.setAttribute('data-value','1');
}

function findIt(element){
  var query = element.value;
  var queryupper = query.toUpperCase();
  var options = document.getElementsByClassName('realOptions');
  var i = 0;
  for(i = 0; i<options.length;i++){
    if(options[i].innerHTML.toUpperCase().includes(query) || options[i].innerHTML.toUpperCase().includes(queryupper)){
      options[i].parentElement.style.display = "block";
    }
    else{
      options[i].parentElement.style.display = "none";
    }
  }

  if(query.length==0){
    for(i = 0; i<options.length;i++){
      options[i].parentElement.style.display = "block";
    }
  } 
}

  customElements.define('period-picker', PeriodPicker);