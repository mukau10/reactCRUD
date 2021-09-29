const mysql = require('mysql');
const dotenv = require('dotenv').config('./.env');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

connection.connect((err)=>{
  if(err){
    console.error("Couldn't connect to the database: " + err.stack);
  }
  else{
    console.log('Connected to the database')
  }
});

module.exports = connection;