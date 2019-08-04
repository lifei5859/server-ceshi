let tool={
    // 继承
    inherit(target, origin){
     function F(){}
     F.prototype = origin.prototype
     target.prototype = new F()
     target.prototype.constructor = target
    },
   extends(origin){
       function F(){
           origin.apply(this,arguments)
       }
       this.inherit(F,origin) 
       return F
   },
   //单例模式
   single(origin){
    var F =  (function(){
         let cache
         return function(){
             if(!cache){
               cache = this
              origin && origin.apply(this,arguments) 
             }
             return cache
         }
      }());
     origin && this.inherit(F,origin)
      return F
   }
 
}
// 防抖
function debounce(fun, time) {
    var key = true
    return function (e) {
        if(key){
            fun(e)
            key = false
        }
        game.timer2 = setTimeout(()=> {
            clearTimeout(game.timer2)
            key = true
        }, time)
    }
}

// function Wo (name){
//     this.name = name
// }
// Wo.prototype.fuck = function(){
//     console.log('shuang')
// }

// var a = tool.extends(Wo)
// var b =new a('woco')
// var s = tool.single(Wo)
// // var s1 = tool.single(Wo)
// var d = new s('woco')
// var d1 = new s('')