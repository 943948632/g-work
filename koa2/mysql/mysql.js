var mysql = require('mysql');
var config = require('./config')


// 数据库核心
var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let query = function (sql, values) {

    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                resolve(err)
            } else {
                connection.query(sql, values, (err, rows) => {

                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })

}

// 注册用户
let insertData = function (value) {
    let _sql = "insert into users(name,pass) values(?,?);"
    return query(_sql, value)
}
// 通过名字查找用户
let findDataByName = function (  name ) {
    let _sql = `
      select * from users
        where name="${name}"
        `
    return query( _sql)

}

// admin通过名字查找用户
let findDataByNameAdmin = function (  name ) {
    let _sql = `
      select * from admin
        where name="${name}"
        `
    return query( _sql)

}

module.exports = {
    insertData,
    findDataByName,
    findDataByNameAdmin
}