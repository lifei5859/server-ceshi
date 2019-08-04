var snake = new Snake();
snake.head = null;
snake.tail = null;
// 设置移动方向
const movement = {
    Right: {
        x: 1,
        y: 0,
        transform: 'rotateZ(90deg)'
    },
    Left: {
        x: -1,
        y: 0,
        transform: 'rotateZ(-90deg)'
    },
    Top: {
        x: 0,
        y: -1,
        transform: 'rotateZ(0deg)'
    },
    Bottom: {
        x: 0,
        y: 1,
        transform: 'rotateZ(180deg)'
    }
}
// 初始化蛇
snake.init = function (ground) {
    let oSnakeHead = Square.cerate('SnakeHead', 3, 1, 'url(/small_project/GluttonousSnake/img/snake.png)');
    let oSnakeBody1 = Square.cerate('SnakeBody', 2, 1, 'url(/small_project/GluttonousSnake/img/snake.png)');
    let oSnakeBody2 = Square.cerate('SnakeBody', 1, 1, 'url(/small_project/GluttonousSnake/img/snake.png)');
    snake.head = oSnakeHead;
    snake.tail = oSnakeBody2;
    oSnakeHead.next = oSnakeBody1;
    oSnakeHead.last = null;
    oSnakeBody1.next = oSnakeBody2;
    oSnakeBody1.last = oSnakeHead;
    oSnakeBody2.last = oSnakeBody1;
    oSnakeBody2.next = null;

    ground.remove(oSnakeHead.x, oSnakeHead.y);
    ground.add(oSnakeHead);
    ground.remove(oSnakeBody1.x, oSnakeBody1.y);
    ground.add(oSnakeBody1);
    ground.remove(oSnakeBody2.x, oSnakeBody2.y);
    ground.add(oSnakeBody2);
    this.direction = movement.Right;
}
// 蛇的一些属性和方法
snake.strategies = {
    // 移动方法
    move(snake, site, ground, key) {
        let newBody = Square.cerate('SnakeBody', snake.head.x, snake.head.y, 'url(/small_project/GluttonousSnake/img/snake.png)');
        newBody.next = snake.head.next;
        newBody.next.last = newBody;
        newBody.last = null;
        ground.remove(snake.head.x, snake.head.y);
        ground.add(newBody);
        let newHead = Square.cerate('SnakeHead', site.x, site.y, 'url(/small_project/GluttonousSnake/img/snake.png)');
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;
        ground.remove(site.x, site.y);
        ground.add(newHead);
        if (!(key == 'eat')) {
            let newFloor = Square.cerate('Floor', snake.tail.x, snake.tail.y, 'url(/small_project/GluttonousSnake/img/map.jpg)');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.add(newFloor);
            snake.tail = snake.tail.last;
        }
        snake.head = newHead;

    },
    // 吃方法
    eat(snake, site, ground) {
        game.score++;
        if (game.score > 6 && game.transferArr[0] == undefined) {
            game.createTransfer(ground);
        }
        this.move(snake, site, ground, 'eat');
        game.createFood(ground);
    },
    // 死方法
    die() {
        game.over();
    },
    // 中毒方法
    toison(snake, site, ground) {
        game.speed = 100;
        this.move(snake, site, ground);
        game.begin();
        setTimeout(function () {
            game.speed = INTERVAL;
            game.toisonKey = true;
            game.begin();
        }, 10000)
    },
    // 穿梭方法
    transfer(snake, site, ground) {
        game.score += 5;
        let num = game.transferArr.indexOf(site);
        let oSite = game.transferArr.filter((ele, i) => {
            return (i != num);
        })
        let newSite = ground.squareArr[oSite[0].x + snake.direction.x][oSite[0].y + snake.direction.y];
        this.move(snake, newSite, ground);
        setTimeout(function () {
            game.transferArr.forEach(ele => {
                ground.remove(ele.x, ele.y);
                let newFloor = Square.cerate('Floor', ele.x, ele.y, 'url(/small_project/GluttonousSnake/img/map.jpg)');
                ground.add(newFloor);
            }
            )
            game.transferArr = [];
        }, 10000);
    }

}

// 触发蛇的方法
snake.move = function (ground) {
    let site = ground.squareArr[this.head.x + this.direction.x][this.head.y + this.direction.y];
    this.head.viewContent.style.transform = this.direction.transform;
    if (typeof site.touch == 'function') {
        this.strategies[site.touch()](this, site, ground);
    }
}
