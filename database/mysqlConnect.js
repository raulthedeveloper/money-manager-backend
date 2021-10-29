const mysql = require('mysql');
const bcrypt = require('bcrypt');


module.exports = class mySqlConnect {

  constructor(host, user, password,database,table) {
    this.host = host
    this.user = user
    this.password = password
    this.database = database
    this.table = table
  }

async  hashIt(password){
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(password, salt);

  return hashed
}


  
  insert(sql)
    {
      var con = mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database
      });


      con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("record inserted");
          });

    }

   

   async createDatabase(database,table,createTableQuery) {
    var con =  mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
    });

    var sql = `SHOW DATABASES LIKE '${this.database}'`;


     con.query(sql, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        console.log('No database exists')
        var sql = `CREATE DATABASE IF NOT EXISTS ${database}`;

        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("database created");          
        });

        sql = `USE ${database}`

        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(`${database} database selected`);          
        });

        sql = `CREATE TABLE ${table} ${createTableQuery}`

        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(`${table} table created`);          
        });

      } else {
        console.log('database exists')

      }
    });

    

  }

  init(createTableQuery)
  {
    this.createDatabase(this.database,this.table,createTableQuery)

    // this.createTable(sql)

  }
}



