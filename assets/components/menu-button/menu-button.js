class MenuButton extends HTMLElement {
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
             div.classList.add("menu-button");
             div.innerHTML = xhr.responseText;
             self.appendChild(div); 
          }
      };      
      xhr.open('GET', 'assets/components/menu-button/menu-button.html');
      xhr.send();
    }
  }

function triggerOpen(element){
  var state = element.getAttribute('data-value');
  if(state==0){
    document.getElementsByClassName('sidebar')[0].classList.remove('sidebar-opened');
    element.setAttribute('data-value','1');
  }
  else{
    document.getElementsByClassName('sidebar')[0].classList.add('sidebar-opened');
    element.setAttribute('data-value','0');
  }
}

  customElements.define('menu-button', MenuButton);