const mysqlConnect = require('../database/mysqlConnect')



const tableSchema = {
    tableName:'Loans',

}




module.exports = class SaveLoanController {
    

    index(view)
    {
 
      return  view
                  
    }

    create(request)
    {
        const database = new mysqlConnect('localhost','root','root','money_app')


        database.init(sql)


        // database.insert()
        
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

