const express = require('express');

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 4000;
const  jwt  = require('jsonwebtoken');
require('dotenv').config();
const mysqlConnect = require('./database/mysqlConnect')
const database = new mysqlConnect(process.env.HOST, process.env.USERNAME, process.env.PASSWORD, process.env.LOANDATABASE,process.env.AUTHTABLE)


var cors = require('cors')

app.use(cors())
var corsOptions = {
  origin: process.env.CORS,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}




let refreshTokens = []

app.post('/token',(req,res)=>{
  const refreshToken = req.body.token
  if(refreshToken == null) return res.sendStatus(401)

  if(!refreshTokens.includes(refreshToken))return res.sendStatus(403)

  jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403)

    const accessToken = generateAccessToken({name:user.name})

    res.json({accessToken:accessToken})
  })


})

app.delete('/logout',cors(), (req,res) => {

  let sql = `DELETE FROM ${process.env.AUTHTABLE} WHERE token='${req.body.token}';`  

  database.deleteRecord(sql)

  sql =  `select * from ${process.env.AUTHTABLE} where '${req.body.token}' = token`

  
  

  database.queryRow(sql, function(err,data){
    if (err) {
        // error handling code goes here
        refreshTokens = []
        console.log("ERROR : ",err);            
    } else {    
        
        // code to execute on data retrieval
        console.log("result from db is : ",data);   
    }    

});

  

  res.sendStatus(204)
})

  app.post('/login',(req, res) => {
  const email = req.body.email
  const user = { name: email }

  const accessToken = generateAccessToken(user)
  console.log(accessToken)
  const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET)


  try{

  const insertQuery = `INSERT INTO ${process.env.AUTHTABLE} (token) VALUES ('${refreshToken}')`


  database.insert(insertQuery)
  }
  catch{
    res.sendStatus(500)
  }
  

  refreshTokens.push(refreshToken)

  res.json({accessToken: accessToken, refreshToken:refreshToken})

});


function generateAccessToken(user){
  return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1h'})
}









app.listen(PORT, () => {

  console.log(`Server is listening on port ${PORT}`)
  const createTableQuery = '(id INT AUTO_INCREMENT PRIMARY KEY, token VARCHAR(255) UNIQUE)'

  database.createTable(process.env.AUTHTABLE,createTableQuery)

});

