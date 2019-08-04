// 地图位置
let BASE_X_POINT = 200;
let BASE_Y_POINT = 100;
// 方块的边长
let SQUAREWIDTH = 20;
// 宽度系数，高度系数
let XLEN = 30;
let YLEN = 30;
// 速度
let INTERVAL = 300;
// 定义方块祖先
function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}
Square.prototype.touch = function () {
    console.log('haoshi');
}
Square.prototype.update = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = this.x * SQUAREWIDTH + 'px';
    this.viewContent.style.top = this.y * SQUAREWIDTH + 'px';
}
// 定义子类
let SnakeHead = tool.single(Square);
let SnakeBody = tool.extends(Square);
let Snake = tool.single(Square);
let Floor = tool.extends(Square);
let Stone = tool.extends(Square);
let Food = tool.single(Square);
let Ground = tool.single(Square);
let Toison = tool.single(Square);
let Transfer = tool.extends(Square);
let Game = tool.single();
//
let touchType = {
    MOVE: 'move',
    EAT: 'eat',
    DIE: 'die'
}
