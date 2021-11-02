const mysqlConnect = require('../database/mysqlConnect')
const { uuid } = require('uuidv4');
require('dotenv').config();




module.exports = class createUser {
    
    async create(request){
        // const database = new mysqlConnect('localhost','root','root','users','users')
        const database = new mysqlConnect(process.env.HOST, process.env.USERNAME, process.env.PASSWORD, process.env.LOANDATABASE,process.env.USERTABLE)


        const createTableQuery = '(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), user_name VARCHAR(255), password VARCHAR(255))'
        // const createTableQuery = `CREATE TABLE IF NOT EXISTS ${database.table} (id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), user_name VARCHAR(255), password VARCHAR(255))`

        

        database.createTable(process.env.USERTABLE,createTableQuery)

        // database.init(createTableQuery)

        const hashedPassword = await database.hashIt(request.password)

        const userId = uuid()

        const insertQuery = `INSERT INTO ${database.table} (user_id ,user_name, password) VALUES ('${userId}', '${request.user_name}','${hashedPassword}')`


        database.insert(insertQuery)

        

        return database.hashIt(request.password)
    }
}