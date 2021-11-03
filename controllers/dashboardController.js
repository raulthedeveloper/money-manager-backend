const mysqlConnect = require("../database/mysqlConnect")

const database = new mysqlConnect(process.env.HOST, process.env.USERNAME, process.env.PASSWORD, process.env.LOANDATABASE,process.env.USERTABLE)


module.exports = class DashBoardController {
    
    getUserData(request,response){
    //    returns user information in response
//    let sql =  `select * from ${process.env.USERTABLE} where '${request.params.id}' = user_name`

//  let sql =`SELECT * FROM ${process.env.USERTABLE} WHERE user_name = '${request.params.id}'`

database.makeQuery()

//     database.queryRow(sql, function(err,data){
//         if (err) {
//             // error handling code goes here
//             console.log("ERROR : ",err);            
//         } else {    
            
//             // code to execute on data retrieval
//             console.log("result from db is : ",data);  
//             response.send(data) 
//         }    
    
    // });

    

    }
}

