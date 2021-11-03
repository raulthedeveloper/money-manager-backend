const mysqlConnect = require('../database/mysqlConnect')
require('dotenv').config();




module.exports = class SaveLoanController {
    

    index(view)
    {
 
      return  view
                  
    }

    create(request,id)
    {
    

        const database = new mysqlConnect(process.env.HOST, process.env.USERNAME, process.env.PASSWORD, process.env.LOANDATABASE, process.env.LOANTABLE)


        const insertQuery = `INSERT INTO ${process.env.LOANTABLE} (user_id, name, loan) VALUES ('${id}','${request.name}','${request.amount}')`



        database.createTable(process.env.LOANTABLE,`(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), name VARCHAR(255), loan INT, FOREIGN KEY (user_id) REFERENCES users(user_id))`)

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

