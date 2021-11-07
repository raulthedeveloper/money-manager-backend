const express = require('express');

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3300;
const HomeController = require('./controllers/homeController')
const SaveLoanController = require('./controllers/saveLoanController')
const CreateUser = require('./controllers/userController')
const  jwt  = require('jsonwebtoken');
require('dotenv').config();
var cors = require('cors')

app.use(cors())

var corsOptions = {
  origin: process.env.CORS,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


const mysqlConnect = require('./database/mysqlConnect')


const save = new SaveLoanController; 
const createUser = new CreateUser;

const databaseCreate = new mysqlConnect(process.env.HOST, process.env.USERNAME, process.env.PASSWORD, process.env.LOANDATABASE, process.env.LOANTABLE)








// Add User Id to route
app.post('/save_loan/:id',(req,res)=>{
  console.log(req.body)
  console.log(req.params)
  res.send(save.create(req.body,req.params.id))

})

app.post('/create_user',cors(),(req,res)=>{
    createUser.create(req.body,res)
    res.send('success')
})




app.get('/dashboard/:id',(req, res) => {
  databaseCreate.makeQueryREST(res,req.params.id,process.env.LOANTABLE,'user_id')
});

app.get('/get_loans/:id',(req, res) => {
  databaseCreate.makeQueryREST(res,req.params.id,process.env.LOANTABLE,'user_id')
});


app.post('/user_id',(req,res) =>{
  console.log(req.headers)
  console.log(req.body)
  databaseCreate.getUserId(res,req.body.email,process.env.USERTABLE,'email')
})



function authenticateToken(req, res, next){


  const authHeader = req.headers['authorization']


  const token = authHeader && authHeader.split(' ')[1]

  if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=>{

      if (err) return res.sendStatus(403)
      // check if request user = user
      req.user = user
      next()
    })
  }





app.listen(PORT, () => {

  console.log(`Server is listening on port ${PORT}`)
databaseCreate.createNewDatabase()


});

