<link rel="stylesheet" class="aplayer-secondary-style-marker" href="\assets\css\APlayer.min.css"><script src="\assets\js\APlayer.min.js" class="aplayer-secondary-script-marker"></script>//通过动画显示数字
function showNumAnimation(i,j,randomNum){
	var numCell=$('#c-'+i+'-'+j);
	numCell.css('background-color',getNumBackgroudColor(randomNum));

	numCell.css('color',getNumColor(randomNum));
	numCell.text(randomNum);

	numCell.animate({
       /*width:'100px',
       height:'100px',*/
       width:cellWidth,
       height:cellWidth,
       top:getPosTop(i),
       left:getPosLeft(j),
	},250);
}

//通过动画显示移动
function showMoveAnimation(fromx,fromy,tox,toy){
	var numCell=$('#c-'+fromx+'-'+fromy);
	numCell.animate({
      top:getPosTop(tox),
      left:getPosLeft(toy),
	},150);
	console.log();
	
}