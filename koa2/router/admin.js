var admin = require('koa-router')()
var md5 = require('md5');
var userModel = require('../mysql/mysql')


admin.post('/adminlogin', async (ctx, next) => {
    //登陆
    var user = {
        name: ctx.request.body.name,
        pass: ctx.request.body.password,
        confirmpass: ctx.request.body.confirmpass
    }
    console.log(user)
    await userModel.findDataByNameAdmin(user.name)
        .then(result => {
            var res = JSON.parse(JSON.stringify(result))
            if (user.name === res[0]['name'] && md5(user.pass) === res[0]['pass']) {
                ctx.body = 'true'

                // ctx.session.user = res[0]['name']
                // ctx.session.id = res[0]['id']
                // console.log('ctx.session.id', ctx.session.id)

                // console.log('session', ctx.session)

                console.log('登录成功')

            }
        }).catch(err => {
            ctx.body = 'false'
            console.log('用户名或密码错误!')

        })
})
module.exports = admin