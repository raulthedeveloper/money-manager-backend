const express = require('express');

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3300;
const HomeController = require('./controllers/homeController')
const SaveLoanController = require('./controllers/saveLoanController')
const CreateUser = require('./controllers/userController')



app.get('/', (req, res) => {
  const home = new HomeController;
  res.send(home.index('<h1>Some HTML</h1>'));
  
});

// Add User Id to route
app.post('/save_loan/:id',(req,res)=>{
  const save = new SaveLoanController;
  res.send(save.create(req.body))

})

app.post('/create_user',(req,res)=>{
  const createUser = new CreateUser;
  res.send(createUser.create(req.body))
})


app.get('/dashboard', (req, res) => {
  res.send('<h1>I am the dashboard page</h1>');
  res.send('<p>Even more HTML</p>');
});



app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));