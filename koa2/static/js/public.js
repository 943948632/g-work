// 全局域名占位符
var Api = "https://staging.tophold.com/";
//ajax 封装
function demoAjax(opt) {
    $.ajax({
        url: Api + opt.url, //数据的接口的路径
        dataType: 'json',
        type: opt.type || "get", //请求的方式  默认是get
        data: opt.param || "", //请求的参数  默认是空
        async: opt.async || true, //是否是异步，默认是异步
        timeout: 10000,
        success: function(res) {
                opt.successBack(res)
        },
        error: function(xhr, type, errorThrown) {
            console.log(JSON.stringify(xhr));
            console.log(type);
            console.log(errorThrown);
        }
    });
};

//获取地址栏的信息
function getSear(key) {
    // 获取URL中?之后的字符
    var str = location.search;
    str = str.substring(1, str.length);
    // 以&分隔字符串，获得类似Source=1这样的元素数组
    var arr = str.split("&");
    var obj = new Object();

    // 将每一个数组元素以=分隔并赋给obj对象    
    for (var i = 0; i < arr.length; i++) {
        var tmp_arr = arr[i].split("=");
        obj[decodeURIComponent(tmp_arr[0])] = decodeURIComponent(tmp_arr[1]);
    }

    return obj[key];
};