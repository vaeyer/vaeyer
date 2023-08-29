var nums = new Array();
var score=0;
var hasDoubleAdd=new Array();//用来解决单元格一次出现重复叠加

var startx=0;
var starty=0;
var endx=0;
var endy=0;


$(document).ready(function() {
	newgame();
});

//开始新游戏
function newgame(){
    $('.black-layout').css('display',"none");

//判断PC端或移动端
if(documentWidth>500){
  containerWidth=500;
  cellWidth=100;
  cellSpace=20;
}else{
  //设置移动端尺寸
  settingForMobile();
}



	init();

    //在2个单元格随机生成数字
    generalGetOneNum();
    generalGetOneNum();
}

function settingForMobile(){
  $('#header .wrapper').css('width',containerWidth);
  $('.grid-container').css('width',containerWidth-cellSpace*2);//因为有padding
  $('.grid-container').css('height',containerWidth-cellSpace*2);
  $('.grid-container').css('padding',cellSpace);
  $('.grid-container').css('border-radius',containerWidth*0.02);

  $('.grid-cell').css('width',cellWidth);
  $('.grid-cell').css('height',cellWidth);
  $('.grid-cell').css('border-radius',cellWidth*0.06);
}

//初始化页面
function init(){
	//初始化单元格位置（底层）
    for(var i=0;i<4;i++){
    	for (var j=0;j<4;j++) {
    	    	var gridCell = $('#'+i+'-'+j);
                 console.log(gridCell);
    		    gridCell.css('top',getPosTop(i));
    		    gridCell.css('left',getPosLeft(j));
    	}
    }


    //初始化数组
    for(var i=0;i<4;i++){
        nums[i]= new Array();
        hasDoubleAdd[i]=new Array();
        for(var j=0;j<4;j++){
            nums[i][j]=0;
            hasDoubleAdd[i][j]=false;
        }
        
    }

    /*nums[0][3]=16;*/
    //动态创建上层单元格并初始化
    updateView();
    score=0;
    updateScore(score);
}


//更新上层单元格视图
function updateView(){
    //将上层清空，重新初始化
    $('.num-cell').remove();

        for(var i=0;i<4;i++){
           for(var j=0;j<4;j++){
               $('.grid-container').append('<div class="num-cell" id="c-'+i+'-'+j+'"></div>');
               var numCell= $("#c-"+i+'-'+j);
               if(nums[i][j]==0){
                    numCell.css('width','0px');
                    numCell.css('height','0px');
                    /*numCell.css('top',getPosTop(i)+50);//从中间生成
                    numCell.css('left',getPosLeft(j)+50);*/
                    numCell.css('top',getPosTop(i)+cellWidth*0.5);//从中间生成
                    numCell.css('left',getPosLeft(j)+cellWidth*0.5);

               }else{
                   /* numCell.css('width','100px');
                    numCell.css('height','100px');*/
                    numCell.css('width',cellWidth);//第二个参数不能加分号否则做字符处理
                    numCell.css('height',cellWidth);
                    numCell.css('top',getPosTop(i));
                    numCell.css('left',getPosLeft(j));
                    numCell.css('background-color',getNumBackgroudColor(nums[i][j]));
                    numCell.css('color',getNumColor(nums[i][j]));
                    numCell.text(nums[i][j]);
               }
               hasDoubleAdd[i][j]=false;

              //移动端设置
            
              $('.num-cell').css('border-radius',cellWidth*0.06);
              $('.num-cell').css('font-size',cellWidth*0.5);
              $('.num-cell').css('line-height',cellWidth+'px');//这里不加px会出错
        }
    }
}

//随机生成数字函数
//1.在空余的单元格随机选一个
//2.随机产生2 or 4
function generalGetOneNum(){
   //判断有无空余
   if(noSpace(nums)){
    return;
   }

   //随机一个位置
   var count=0;
   var temp=new Array();
    for(i=0;i<4;i++){
        for(j=0;j<4;j++){
            if(nums[i][j]==0){
                temp[count]=i*4+j;//采用这种方式避免用二维数组去储存位置
                count++;
            }
        }
    }
   
    //向下取整使得pos与上方count还没++前对应[0,1)*6=[0,5]
    var pos= Math.floor(Math.random()*count);
    var randomX=Math.floor(temp[pos]/4);
    var randomY=Math.floor(temp[pos]%4);

       //随机一个数字2、4
       var randomNum=Math.random()<0.5?2:4;
     
       //在随机位置显示数字2或4
       nums[randomX][randomY]=randomNum;
       showNumAnimation(randomX,randomY,randomNum);
}

//绑定键盘事件
$(document).keydown(function(event) {
    //阻止事件的默认行为
    event.preventDefault();
    switch (event.keyCode) {
        case 37://左
              //判断是否可以移动
              if(canMoveLeft(nums)){
                        moveLeft();
                        generalGetOneNum();
                          if(noSpace(nums) && noMove(nums)){/*注意：不传参数会报错！*/
                            //   setTimeout(function() {alert("Game Over!")},1000);
                              $('.black-layout').css('display',"flex");
                            }
                        
              }
            break;

        case 38://上
             if(canMoveUp(nums)){
                        moveUp();
                        generalGetOneNum();
                          if(noSpace(nums) && noMove(nums)){/*注意：不传参数会报错！*/
                                //  setTimeout(function() {alert("Game Over!")},1000);
                                 $('.black-layout').css('display',"flex");
                              }
              }
            break;

        case 39://右
              if(canMoveRight(nums)){
                        moveRight();
                        generalGetOneNum();
                          if(noSpace(nums) && noMove(nums)){/*注意：不传参数会报错！*/
                                //  setTimeout(function() {alert("Game Over!")},1000);
                                 $('.black-layout').css('display',"flex");
                              }
                      }
            break;

        case 40://下
              if(canMoveDown(nums)){
                        moveDown();
                        generalGetOneNum();
                          if(noSpace(nums) && noMove(nums)){/*注意：不传参数会报错！*/
                                //  setTimeout(function() {alert("Game Over!")},1000);
                                 $('.black-layout').css('display',"flex");
                              }
                      }
            break;
    }
});

//实现触摸滑动响应事件
document.addEventListener('touchstart',function(event){
//   console.log(event.touches[0].pageX);
  startx=event.touches[0].pageX;
  starty=event.touches[0].pageY;
});
document.addEventListener('touchend',function(event){
  /*console.log(event);*/
  endx=event.changedTouches[0].pageX;
  endy=event.changedTouches[0].pageY;

  //判断滑动方向
  var changeX=endx-startx;
  var changeY=endy-starty;
  //当滑动太小时不作处理
  if(Math.abs(changeX)<documentWidth*0.04&&Math.abs(changeY)<documentWidth*0.04){
   return;//即调出函数
  }

  if(Math.abs(changeX)>=Math.abs(changeY)){//水平移动
     if(changeX>0){//向右
                    if(canMoveRight(nums)){
                        moveRight();
                        generalGetOneNum();
                          if(noSpace(nums) && noMove(nums)){/*注意：不传参数会报错！*/
                                //  setTimeout(function() {alert("Game Over!")},1000);
                                 $('.black-layout').css('display',"flex");
                              }
                      }
     }else{//向左
            //判断是否可以移动
              if(canMoveLeft(nums)){
                        moveLeft();
                        generalGetOneNum();
                          if(noSpace(nums) && noMove(nums)){/*注意：不传参数会报错！*/
                            //   setTimeout(function() {alert("Game Over!")},1000);
                              $('.black-layout').css('display',"flex");
                            }
                        
              }
     }
  }else{//垂直
      if(changeY>0){//向下
                    if(canMoveDown(nums)){
                        moveDown();
                        generalGetOneNum();
                          if(noSpace(nums) && noMove(nums)){/*注意：不传参数会报错！*/
                                //  setTimeout(function() {alert("Game Over!")},1000);
                                 $('.black-layout').css('display',"flex");
                              }
                      }
     }else{//向上
          if(canMoveUp(nums)){
                        moveUp();
                        generalGetOneNum();
                          if(noSpace(nums) && noMove(nums)){/*注意：不传参数会报错！*/
                                //  setTimeout(function() {alert("Game Over!")},1000);
                                 $('.black-layout').css('display',"flex");
                              }
              }  
     }
  }
});

/*
   左移
   1.落脚点没有数字，且路径无障碍物
   2.落脚点数字和自己相同，且路径无障碍物
*/
function moveLeft(){
     for(i=0;i<4;i++){
        for(j=1;j<4;j++){//从左往右找
            if(nums[i][j]!=0){
                for(var k=0;k<j;k++){
                    if(nums[i][k]==0&&noBlock_X(i,k,j,nums)){//第i行的k到j列是否有障碍物
                        //没有则移动
                        showMoveAnimation(i,j,i,k);//从j列移动到k列
                        nums[i][k]=nums[i][j];
                        nums[i][j]=0;
                        break;
                    }else if (nums[i][k]==nums[i][j]&&noBlock_X(i,k,j,nums)&& !hasDoubleAdd[i][k]) {
                        showMoveAnimation(i,j,i,k);
                        nums[i][k]+=nums[i][j];
                        nums[i][j]=0;
                        //统计分数
                        score+=nums[i][k];
                        updateScore(score);
                        hasDoubleAdd[i][k]=true;
                        break;
                    }
                }
            }
        }
     }
     //更新数字单元格，才能真正更新移动效果，否则会造成移动单元的id不变，导致两个上层单元格位置冲突
     setTimeout('updateView()',150);//否则动画还没执行完就被更新，会变成闪现的效果。

}

/*右移*/
function moveRight(){
     for(i=0;i<4;i++){
        for(j=2;j>=0;j--){
            if(nums[i][j]!=0){
                for(var k=3;k>j;k--){//从右往左找
                    if(nums[i][k]==0&&noBlock_X(i,j,k,nums)){//第i行的j到k列是否有障碍物
                        //没有则移动
                        showMoveAnimation(i,j,i,k);//从j列移动到k列
                        nums[i][k]=nums[i][j];
                        nums[i][j]=0;
                        break;
                    }else if (nums[i][k]==nums[i][j]&&noBlock_X(i,j,k,nums)&& !hasDoubleAdd[i][k]) {
                        showMoveAnimation(i,j,i,k);
                        nums[i][k]+=nums[i][j];
                        nums[i][j]=0;
                        //统计分数
                        score+=nums[i][k];
                        updateScore(score);
                        hasDoubleAdd[i][k]=true;
                        break;
                    }
                }
            }
        }
     }
     //更新数字单元格，才能真正更新移动效果，否则会造成移动单元的id不变，导致两个上层单元格位置冲突
     setTimeout('updateView()',150);//否则动画还没执行完就被更新，会变成闪现的效果。

}
/*上移*/
function moveUp(){
     for(j=0;j<4;j++){
        for(i=1;i<4;i++){
            if(nums[i][j]!=0){//实质就是一列一列下来[0][0]\[1][0]\[2][0]\[3][0]
                for(var k=0;k<i;k++){//从上往下找
                    if(nums[k][j]==0&&noBlock_Y(j,k,i,nums)){//第j列的k到i行是否有障碍物
                        //没有则移动
                        showMoveAnimation(i,j,k,j);//从i行移动到k行
                        nums[k][j]=nums[i][j];
                        nums[i][j]=0;
                        break;
                    }else if (nums[k][j]==nums[i][j]&&noBlock_Y(j,k,i,nums)&& !hasDoubleAdd[k][j]) {//第i行的的第k到j列有误障碍物
                        showMoveAnimation(i,j,k,j);
                        nums[k][j]+=nums[i][j];
                        nums[i][j]=0;
                        //统计分数
                        score+=nums[k][j];
                        updateScore(score);
                        hasDoubleAdd[k][j]=true;
                        break;
                    }
                }
            }
        }
     }
     //更新数字单元格，才能真正更新移动效果，否则会造成移动单元的id不变，导致两个上层单元格位置冲突
     setTimeout('updateView()',150);//否则动画还没执行完就被更新，会变成闪现的效果。

}
/*x下移*/
function moveDown(){
     for(j=0;j<4;j++){
        for(i=2;i>=0;i--){
            if(nums[i][j]!=0){//实质就是一列一列上去[0][0]\[1][0]\[2][0]\[3][0]
                for(var k=3;k>i;k--){//从下往上找
                    if(nums[k][j]==0&&noBlock_Y(j,i,k,nums)){//第j列的i到k行是否有障碍物
                        //没有则移动
                        showMoveAnimation(i,j,k,j);//从i行移动到k行
                        nums[k][j]=nums[i][j];
                        nums[i][j]=0;
                        break;
                    }else if (nums[k][j]==nums[i][j]&&noBlock_Y(j,i,k,nums)&& !hasDoubleAdd[k][j]) {//第i行的的第k到j列有误障碍物
                        showMoveAnimation(i,j,k,j);
                        nums[k][j]+=nums[i][j];
                        nums[i][j]=0;
                        //统计分数
                        score+=nums[k][j];
                        updateScore(score);
                        hasDoubleAdd[k][j]=true;
                        break;
                    }
                }
            }
        }
     }
     //更新数字单元格，才能真正更新移动效果，否则会造成移动单元的id不变，导致两个上层单元格位置冲突
     setTimeout('updateView()',150);//否则动画还没执行完就被更新，会变成闪现的效果。

}