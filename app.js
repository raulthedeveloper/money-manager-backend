const express = require('express');

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3300;
const HomeController = require('./controllers/homeController')
const SaveLoanController = require('./controllers/saveLoanController')
const CreateUser = require('./controllers/userController')
const DashBoardController = require('./controllers/dashboardController')
const  jwt  = require('jsonwebtoken');
require('dotenv').config();

const mysqlConnect = require('./database/mysqlConnect')


const save = new SaveLoanController; 
const createUser = new CreateUser;
const userDashboard = new DashBoardController

const databaseCreate = new mysqlConnect(process.env.HOST, process.env.USERNAME, process.env.PASSWORD, process.env.LOANDATABASE, process.env.LOANTABLE)







app.get('/', (req, res) => {
  const home = new HomeController;
  res.send(home.index('<h1>Some HTML</h1>'));
  
});

// Add User Id to route
app.post('/save_loan/:id',authenticateToken,(req,res)=>{
  res.send(save.create(req.body,req.params.id))

})

app.post('/create_user',(req,res)=>{
    createUser.create(req.body,res)
    res.send()
})




app.get('/dashboard/:id',authenticateToken,(req, res) => {
  databaseCreate.makeQueryREST(res,req.params.id,process.env.LOANTABLE,'user_id')
});




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

