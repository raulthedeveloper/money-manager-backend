const mysqlConnect = require('../database/mysqlConnect')
const { uuid } = require('uuidv4');
require('dotenv').config();




module.exports = class createUser {
    
    async create(request){
        const database = new mysqlConnect(process.env.HOST, process.env.USERNAME, process.env.PASSWORD, process.env.LOANDATABASE,process.env.USERTABLE)


        const createTableQuery = '(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255) UNIQUE,first_name VARCHAR(255), last_name VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255))'

        

        database.createTable(process.env.USERTABLE,createTableQuery)


        const hashedPassword = await database.hashIt(request.password)

        const userId = uuid()

        const insertQuery = `INSERT INTO ${database.table} (user_id,first_name, last_name ,email, password) VALUES ('${userId}','${request.first_name}','${request.last_name}', '${request.email}','${hashedPassword}')`


        database.insert(insertQuery)

        

        return database.hashIt(request.password)
    }
}