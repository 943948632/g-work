

var user = require('koa-router')()
var md5 = require('md5');
var userModel = require('../mysql/mysql')
var statuscode = require('./status')
//图形验证码
var ccap = require('ccap')
var captcha = ccap()
var log_text;
var reg_text;
//短信
var QcloudSms = require("qcloudsms_js");

var appid = 1400056594;
var appkey = "9f039d38944774290124ac707d2a2c64";
var phoneNumbers = ["13022195532"];
var qcloudsms = QcloudSms(appid, appkey);
var ssender = qcloudsms.SmsSingleSender();
// 请求回调处理, 这里只是演示，用户需要自定义相应处理回调



user.get('/user/register/code', async (ctx, next) => {
    //短信验证码
    ssender.send(0, 86, phoneNumbers[0], "测试短信", "", "", callback);
    function callback(err, res, resData) {
        if (err)
            console.log("err: ", err);
        else
            console.log("response data: ", resData);
    }

}).get('/user/login', async (ctx, next) => {
    //登陆
    await ctx.render('login')
}).get('/user/register', async (ctx, next) => {
    //注册
    await ctx.render('register')
}).get('/user/register/codeimg', async (ctx, next) => {
    var ary = captcha.get();
    reg_text = ary[0];
    //图形验证码
    ctx.body = ary[1];
    ctx.type = 'image/png';
    ary = captcha.get();
    console.log(text);
}).post('/user/register', async (ctx, next) => {
    //注册
    var user = {
        name: ctx.request.body.name,
        pass: ctx.request.body.password,
        confirmpass: ctx.request.body.confirmpass,
        codeimg: ctx.request.body.verify
    };

    if (text !== user.codeimg.toUpperCase()) {
        ctx.body = {
            'code': statuscode.errorcode,
            'mes': "验证码错误"
        }
    };
    await userModel.findDataByName(user.name)
        .then(result => {
            if (result.length) {
                try {
                    ctx.body = {
                        'code': statuscode.successcode,
                        'mes': "用户已存在"
                    };
                } catch (error) {
                    //处理err
                    console.log(error)
                }
            } else if (user.pass !== user.confirmpass || user.pass == '') {
                ctx.body = {
                    'code': statuscode.successcode,
                    'mes': "两次密码都一样"
                };
            } else {
                ctx.body = {
                    'code': statuscode.successcode,
                    'mes': "注册成功"
                };
                userModel.insertData([ctx.request.body.name, md5(user.pass)])
            }
        })

}).get('/user/login/codeimg', async (ctx, next) => {
    var ary = captcha.get();
    log_text = ary[0];
    //图形验证码
    ctx.body = ary[1];
    ctx.type = 'image/png';
    ary = captcha.get();






}).post('/user/login', async (ctx, next) => {
    //登陆
    var user = {
        name: ctx.request.body.name,
        pass: ctx.request.body.password,
        confirmpass: ctx.request.body.confirmpass,
        codeimg: ctx.request.body.verify
    };


    if (log_text !== user.codeimg.toUpperCase()) {
        ctx.body = {
            'code': statuscode.errorcode,
            'mes': "验证码错误"
        }
    }

    await userModel.findDataByName(user.name)
        .then(result => {
            var res = JSON.parse(JSON.stringify(result));
            console.log(res)
            if (user.name === res[0]['name'] && md5(user.pass) === res[0]['pass']) {

                if (user.pass !== user.confirmpass) {
                    ctx.body = {
                        'code': statuscode.errorcode,
                        'mes': "密码两次不正确"
                    }
                };


                ctx.body = {
                    'code': statuscode.successcode,
                    'mes': "登陆成功"
                }

                // ctx.session.user = res[0]['name']
                // ctx.session.id = res[0]['id']
                // console.log('ctx.session.id', ctx.session.id)

                // console.log('session', ctx.session)


            }
        }).catch(err => {
            console.log(user.name + "====" + res[0]['name'] + "====" + res[0]['pass'])

            ctx.body = {
                'code': statuscode.errorcode,
                'mes': "用户或密码错误"
            }

        })


})

module.exports = user