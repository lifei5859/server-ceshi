function Square() {

}
// 生成方块单位
Square.cerate = function (type, x, y, color) {
    if (typeof Square.prototype[type] != 'function') {
        throw 'woco  出错了';
    }
    if (Square.prototype[type].prototype.__proto__ != Square.prototype) {
        Square.prototype[type].prototype = new Square();
    }
    var newSquare = new Square.prototype[type](x, y, color);
    return newSquare;
}
// 方块单位初始化
Square.prototype.init = function (square, img, msg) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.top = square.y * SQUAREWIDTH + 'px';
    square.viewContent.style.left = square.x * SQUAREWIDTH + 'px';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.backgroundImage = img;
    square.touch = function () {
        return msg;
    }

}
// 事物的父类
Square.prototype.Food = function (x, y, img) {
    var obj = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH);
    var square = new this.init(obj, img, 'eat');
    obj.viewContent.className = 'food';
    obj.update(x, y);
    return obj;
}
// 地板父类
Square.prototype.Floor = function (x, y, img) {
    var obj = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);
    obj.viewContent.className = 'floor';
    obj.oType = 'floor';
    var square = new this.init(obj, img, 'move');
    return obj;
}
//墙父类
Square.prototype.Stone = function (x, y, img) {
    var obj = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH);
    obj.viewContent.className = 'stone';
    var square = new this.init(obj, img, 'die');
    return obj;
}
//蛇头  父类
Square.prototype.SnakeHead = function (x, y, img) {
    var obj = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH);
    obj.viewContent.className = 'snakehead';
    var square = new this.init(obj, img, 'die');
    obj.update(x, y);
    return obj;
}
// 蛇身子父类
Square.prototype.SnakeBody = function (x, y, img) {
    var obj = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH);
    obj.viewContent.className = 'snakebody';
    var square = new this.init(obj, img, 'die');
    return obj;
}
// 毒药父类
Square.prototype.Toison = function (x, y, img) {
    var obj = new Toison(x, y, SQUAREWIDTH, SQUAREWIDTH);
    obj.viewContent.className = 'toison';
    var square = new this.init(obj, img, 'toison');
    obj.update(x, y);
    return obj;
}
// 穿梭洞  父类
Square.prototype.Transfer = function (x, y, img) {
    var obj = new Transfer(x, y, SQUAREWIDTH, SQUAREWIDTH);
    obj.viewContent.className = 'transfer';
    obj.oType = 'transfer';
    var square = new this.init(obj, img, 'transfer');
    obj.update(x, y);
    return obj;
}