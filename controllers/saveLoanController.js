const mysqlConnect = require('../database/mysqlConnect')
require('dotenv').config();



const tableSchema = {
    tableName:'Loans',

}

// process.env.USER_ID // "239482"



module.exports = class SaveLoanController {
    

    index(view)
    {
 
      return  view
                  
    }

    create(request)
    {
        console.log(process.env.PASSWORD)


        const database = new mysqlConnect(process.env.HOST, process.env.USERNAME, process.env.PASSWORD, process.env.LOANDATABASE, process.env.LOANTABLE)



        const createTableQuery = '(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), loan INT)'

        const insertQuery = `INSERT INTO ${database.table} (name, loan) VALUES ('${request.name}','${request.amount}')`

        database.init(createTableQuery)


        // Database still isnt  automacally recognizing table , its an async issue
        database.insert(insertQuery)
        
        // Save to the database using mysql
        // Checks if database exist if it doesnt then it creates it
        return request.name
    }

    update(request)
    {
        return 'this is the update method'
    }

    delete(request)
    {
        return 'this is the delete method'
    }
}

