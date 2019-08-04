let ground = new Ground(BASE_X_POINT, BASE_Y_POINT, SQUAREWIDTH * XLEN, SQUAREWIDTH * YLEN);
//地图接口
ground.init = function () {
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.className='ground';
    document.body.appendChild(this.viewContent);
    this.squareArr = [];
    // 生成地板围墙
    for(var i = 0 ; i<YLEN;i++ ){
        var newSquare = null;
        this.squareArr[i] = new Array(YLEN);
        for (var j = 0 ; j< XLEN ; j++){
        if (i == 0 || j == 0 || i == YLEN-1 || j == XLEN-1 ){
            newSquare = Square.cerate ('Stone',i,j,'url(/small_project/GluttonousSnake/img/stone.png)');
        }else{
            newSquare = Square.cerate ('Floor',i,j,'url(/small_project/GluttonousSnake/img/map.jpg)');
        }
        this.squareArr[i][j]  = newSquare;
        this.viewContent.appendChild(newSquare.viewContent);
        }
    }
}

// 拆方块 添加方块 方法
ground.remove=function (x,y){
   this.viewContent.removeChild(this.squareArr[x][y].viewContent);
   this.squareArr[x][y] = null;
}
ground.add=function (square){
    this.viewContent.appendChild(square.viewContent);
    this.squareArr[square.x][square.y] = square;
 }
