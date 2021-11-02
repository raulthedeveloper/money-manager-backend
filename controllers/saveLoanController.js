const mysqlConnect = require('../database/mysqlConnect')
require('dotenv').config();




module.exports = class SaveLoanController {
    

    index(view)
    {
 
      return  view
                  
    }

    create(request)
    {
    

        const database = new mysqlConnect(process.env.HOST, process.env.USERNAME, process.env.PASSWORD, process.env.LOANDATABASE, process.env.LOANTABLE)


        const insertQuery = `INSERT INTO ${process.env.LOANTABLE} (name, loan) VALUES ('${request.name}','${request.amount}')`


        database.createTable(process.env.LOANTABLE,`(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), loan INT)`)

        database.insert(insertQuery)
       
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

