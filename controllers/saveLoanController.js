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


        const insertQuery = `INSERT INTO ${process.env.LOANTABLE} (user_id, name, term, amount, interest, loanType) VALUES ('${id}','${request.name}','${request.term}','${request.amount}','${request.interest}','${request.loanType}')`



        database.createTable(process.env.LOANTABLE,`(id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(255), name VARCHAR(255),term INT, amount INT, interest INT, loanType VARCHAR(255), FOREIGN KEY (user_id) REFERENCES users(user_id))`)

        database.insert(insertQuery)
       
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

