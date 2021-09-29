const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config('./.env');
const conn = require('./database');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());

app.get('/', (req, res)=>{
  res.send('World')
})

app.post('/create', (req, res)=>{
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let age = req.body.age;
  let country = req.body.country;
  let position = req.body.position;
  let wage = req.body.wage;

  let insertData = `INSERT INTO employees (firstName, lastName, age, country, position, wage) values("${firstName}", "${lastName}", ${age}, "${country}", "${position}", ${wage})`;

  conn.query(insertData, (err, result)=>{
    if (err){
      console.log(err)
    }
    res.redirect('/');
  })
});

app.get('/api', (req, res)=>{
  conn.query("SELECT * FROM employees", (err, result)=>{
    if(err){
      console.log(err);
    }else{
      res.send(result)
    }
  })
});

app.listen(PORT, ()=>{
  console.log(`Connected to the port ${PORT}`);
})