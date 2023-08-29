//获取移动端尺寸
//var screenWidth=window.screen.availWidth;/*屏幕宽度*/
var documentWidth=document.documentElement.clientWidth/*DOM宽度*/
var containerWidth=documentWidth*0.92;//容器
var cellWidth=documentWidth*0.18;//单元格
var cellSpace=documentWidth*0.04;//单元格间隔


//获取距离上边的位置
function getPosTop(i){
	//return 20+120*e;
	return cellSpace+(cellWidth+cellSpace)*i;
}
//获取距离左边的位置
function getPosLeft(j){
	//return 20+120*e;
	return cellSpace+(cellWidth+cellSpace)*j;
}

//获取数字背景颜色
function getNumBackgroudColor(num){
	switch (num) {
		case 2:
			return "#eee4da";
			break;
		case 4:
			return "#ede0c8";
			break;
		case 8:
			return "#f2b179";
			break;
		case 16:
			return "#f59563";
			break;
		case 32:
			return "#f67c5f";
			break;
		case 64:
			return "#f65e3b";
			break;
		case 128:
			return "#edcf72";
			break;
		case 256:
			return "#edcc61";
			break;
		case 512:
			return "#9c0";
			break;
		case 1024:
			return "#33b5e5";
			break;
		case 2048:
			return "#09c";
			break;
		case 4096:
			return "#a6c";
			break;
		case 8192:
			return "#93c";
			break;
		
	}
}

//获取数字颜色
function getNumColor(num){
	if(num<=4){
		return '#776e65';
	}else {
		return '#fff';
	}
}

//判断是否已经没有空间了
function noSpace(nums){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]==0){
				return false;
			}
		}
	}
	return true;
}

//判断是否可以移动
function canMoveLeft(nums){
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(nums[i][j]!=0){
				if(nums[i][j-1]==0 || nums[i][j-1]==nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//判断是否可以右移动
function canMoveRight(nums){
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){
			if(nums[i][j]!=0){
				if(nums[i][j+1]==0 || nums[i][j+1]==nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//可否上移
function canMoveUp(nums){
	for(var i=1;i<4;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]!=0){
				if(nums[i-1][j]==0 || nums[i-1][j]==nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//可否下移
function canMoveDown(nums){
	for(var i=0;i<3;i++){
		for(var j=0;j<4;j++){
			if(nums[i][j]!=0){
				if(nums[i+1][j]==0 || nums[i+1][j]==nums[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

//判断水平障碍物
function noBlock_X(row,col1,col2,nums){
   for(var i=col1+1;i<col2;i++){
   	if(nums[row][i]!=0){
   		return false;
   	}
   }
   return true;
}
//判断垂直障碍物
function noBlock_Y(col,row1,row2,nums){
   for(var i=row1+1;i<row2;i++){
   	if(nums[i][col]!=0){
   		return false;
   	}
   }
   return true;
}
//更新分数
function updateScore(score){
	$('#score').text(score);
}

//判断是否不能移动了
function noMove(nums){
	if(canMoveLeft(nums) || canMoveRight(nums) || canMoveUp(nums) || canMoveDown(nums)){
		return false;
	}
	return true;
}

//判断游戏是否结束：1.没有空的单元格 2.且不能移动了
//function isGameOver(nums){
	//if(noSpace(nums) && noMove(nums)){/*注意：不传参数会报错！*/
		//setTimeout(alert("Game Over!"),400);
	
//}
