function showDropdown(object){

	var element = object.nextSibling.nextSibling;
	var state = element.getAttribute('data-value');
	if(state==0){
		element.style.display= "none";
		element.setAttribute('data-value','1');
	}
	else{
		element.style.display="block";
		element.setAttribute('data-value','0');
	}

}