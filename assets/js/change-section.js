function changeSection(x){
	var ps = document.querySelectorAll(".sections > p");

	var tableBlocks = document.querySelectorAll(".main-table-block");

	for(i=0;i<ps.length;i++){
		ps[i].classList.remove('active-section');
	}

	ps[x].classList.add('active-section');

	if(tableBlocks.length>0){
		for(j=0;j<tableBlocks.length;j++){
			tableBlocks[j].classList.remove('active-category');
		}
	tableBlocks[x].classList.add('active-category');
	}
}
