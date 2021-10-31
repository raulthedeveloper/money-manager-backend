const express = require('express');

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3300;
const HomeController = require('./controllers/homeController')
const SaveLoanController = require('./controllers/saveLoanController')
const CreateUser = require('./controllers/userController')
const LoginController = require('./controllers/loginController');
const  jwt  = require('jsonwebtoken');
require('dotenv').config();

const save = new SaveLoanController; 
const createUser = new CreateUser;
const login = new LoginController;








app.get('/', (req, res) => {
  const home = new HomeController;
  res.send(home.index('<h1>Some HTML</h1>'));
  
});

// Add User Id to route
app.post('/save_loan/:id',(req,res)=>{
  res.send(save.create(req.body))

})

app.post('/create_user',(req,res)=>{
    createUser.create(req.body)
    res.send()
})



app.post('/login',(req,res)=>{
login.request = req.body
login.response = res


  login.authenticateUser(req.body,res)
 
  
})


app.get('/dashboard',authenticateToken,(req, res) => {
  res.send(req.user)
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





app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));