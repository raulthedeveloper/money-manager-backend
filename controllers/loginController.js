const mysqlConnect = require('../database/mysqlConnect')
require('dotenv').config();




module.exports = class LoginController {
    

    authenticateUser(request){
        console.log('Its time to authenticate')

        const database = new mysqlConnect(process.env.HOST, process.env.USERNAME, process.env.PASSWORD, process.env.LOANDATABASE, process.env.USERTABLE)



        // const insertQuery = `SELECT EXISTS(SELECT 1 FROM user_name WHERE user = 'Siabo13')`

        const insertQuery = `SELECT user_name, password FROM ${database.table} WHERE user_name LIKE "Siabo13" AND password LIKE "$2b$06$UMq2M5DB65LEHalWqMDDh.G/aIlY//uR.ViQr1FEWKOFvB91j/eFu"`


       console.log( database.queryTable(insertQuery))
        // compare request credentials to stored credentials

        return request
    }
}
