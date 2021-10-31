const mysqlConnect = require('../database/mysqlConnect')
require('dotenv').config();
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


const database = new mysqlConnect(process.env.HOST, process.env.USERNAME, process.env.PASSWORD, process.env.LOANDATABASE, process.env.USERTABLE)



module.exports = class LoginController {


    async processResult(query,request,response){
        // this is where the magic happens
        console.log('Its time to process')
        
      
        

        try {
            const queryPassword = query[0].password
            const queryUserName = query[0].user_name

            if(queryPassword == null){
                return response.status(400)
            }
    
            if(queryUserName == null){
                return response.status(400)
            }

            if(await bcrypt.compare(request.password, queryPassword)){
                console.log('password worked')

                
                // give web token here
                const username = request.user_name
                const user = {name: username}

                


            // created web token
              const accessToken =  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)

              

              response.json({accessToken: accessToken})
                return response.send('Success')
            }
            else{
               return  response.send('not allowed')
            }
           
        } 
        catch{
            response.status(500).send()
        }

        

    }

    async authenticateUser(request,response,returnData){

        console.log('Its time to authenticate')
      

       const insertQuery = `SELECT user_name, password FROM ${database.table} WHERE user_name LIKE "${request.user_name}"`
    //    AND password LIKE "$2b$06$XZj7ppDnGew/RRfOx1U/WuTz.wq0kwyZgdVLWH.FzYWtCK0taC.mm"
       database.queryTable(insertQuery,this.processResult,request,response)

  
    }


     
 
    
}
