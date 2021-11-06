const mysql = require('mysql');
const bcrypt = require('bcrypt');
const {
  response
} = require('express');


module.exports = class mySqlConnect {

  constructor(host, user, password, database, table) {
    this.host = host
    this.user = user
    this.password = password
    this.database = database
    this.table = table
  }

  connection() {
    return mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database
    });
  }


  // Hashes password
  async hashIt(password) {
    const salt = await bcrypt.genSalt(6);
    const hashed = await bcrypt.hash(password, salt);


    return hashed
  }



  insert(sql) {


    this.connection().query(sql, function (err, result) {
      if (err) throw err;
      console.log("record inserted");
    });

  }

  makeQueryREST(response,id,table,column){
    var con = this.connection()

    let sql =`SELECT * FROM ${table} WHERE ${column} = '${id}'`

    con.query(sql, function (err, result) {
      if (err) throw err;
      response.json(result);
    });
  }

  getUserId(response,user_name,table,column){
    var con = this.connection()

    let sql =`SELECT * FROM ${table} WHERE ${column} = '${user_name}'`

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result)
      response.json(result[0].user_id);
    });
    con.end()
  }

  queryRow(sql,returnValue) {

    var con = this.connection()

    
    con.query(sql, function (err, result) {
      if (err) throw err;
      returnValue(result)
    });



  }

  deleteRecord(sql) {
    // Deletes record

    var con = this.connection()

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });



  }


  async createTable(table, createTableQuery) {
    var con = this.connection()

    var sql = `CREATE TABLE IF NOT EXISTS ${table}  ${createTableQuery}`

    const queryDB = await con.query(sql, function (err, result) {
      if (err) throw err;
      console.log(`${table} table created`);
    });




  }

  createNewDatabase() {
    var con = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
    });
    var sql = `CREATE DATABASE IF NOT EXISTS ${this.database}`;

    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("database created");
    });
  }





}