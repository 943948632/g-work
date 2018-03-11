var AipOcr = require('./src/index').ocr;
var fs = require('fs');
var http = require('http');

//设置APPID/AK/SK（前往百度云控制台创建应用后获取相关数据）
var APP_ID = "10855358";
var API_KEY = "y20AAcpttqrYKxUxa4hIjG6T";
var SECRET_KEY = "0AAK6gfpuvai2RfuypArN2Z22aNTXndw";

var client = new AipOcr(APP_ID, API_KEY, SECRET_KEY);

var image = fs.readFileSync('assets/1.jpg');
console.log(image)

var app = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
    var base64Img = new Buffer(image).toString('base64');
    client.generalBasic(base64Img).then(function (result) {
        res.end(JSON.stringify(result));
    });
});

app.listen(8000, function () {
    console.log('listening on 8000');
});

