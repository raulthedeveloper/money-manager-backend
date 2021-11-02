const mysql = require('mysql');
const bcrypt = require('bcrypt');
const { response } = require('express');


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

   async queryTable(sql,callback,request,response){

    this.connection().query(sql, function (err, result) {
      if (err) throw err;


      callback(result,request,response)

      
      });


  }

  deleteRecord(sql){
    // Deletes record
  }


  async createTable(table,createTableQuery) {
    var con = this.connection()

    var sql = `CREATE TABLE IF NOT EXISTS ${table}  ${createTableQuery}`

      const queryDB = await con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(`${table} table created`);
        });
    


    
  }

   createNewDatabase(){
    var  con = mysql.createConnection({
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


  // async createDatabase(database, table, createTableQuery) {
  //   var con = mysql.createConnection({
  //     host: this.host,
  //     user: this.user,
  //     password: this.password,
  //   });

  //   var sql = `SHOW DATABASES LIKE '${this.database}'`;


  //   con.query(sql, function (err, result) {
  //     if (err) throw err;
  //     if (result.length == 0) {
  //       console.log('No database exists')
  //       var sql = `CREATE DATABASE IF NOT EXISTS ${database}`;

  //       con.query(sql, function (err, result) {
  //         if (err) throw err;
  //         console.log("database created");
  //       });

  //       sql = `USE ${database}`

  //       con.query(sql, function (err, result) {
  //         if (err) throw err;
  //         console.log(`${database} database selected`);
  //       });

  //       sql = `CREATE TABLE ${table} ${createTableQuery}`

  //       con.query(sql, function (err, result) {
  //         if (err) throw err;
  //         console.log(`${table} table created`);
  //       });

  //     } else {
  //       console.log('database exists')

  //     }
  //   });



  // }


}