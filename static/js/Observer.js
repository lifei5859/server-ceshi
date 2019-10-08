var oInput = document.getElementById('demo');
var oP = document.getElementById('show');

var oData = {
    value: 'hi',
    obj: {
        val: '666'
    },
    arr: ['789']
}


oInput.oninput = function () {
    oData.value = this.value;
}

function upDate () {
    oInput.value = oData.value;
    oP.innerHTML = oData.value;
}
upDate()
function Observer (data) {
    //如果要监控的属性的层级觉深可以递归
    if (!data || typeof data !== 'object') return data;
    //便利对象的key进行监控
    Object.keys(data).forEach(function (key) {
        watchValue(data, key, data[key]);
    });
}

function watchValue (data, key, val) {
    //先监控一下 如果val是引用值则递归下去
    Observer(val)
    Object.defineProperty(data, key, {
        get () {
            return val;
        },
        set (newVal) {
            // 两次的值相等则不更新
            if (val === newVal) return;
            val = newVal
            upDate();
        }
    })
}
Observer(oData);
