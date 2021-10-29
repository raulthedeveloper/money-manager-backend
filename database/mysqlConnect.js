var mysql = require('mysql');


module.exports = class mySqlConnect {

  constructor(host, user, password,database,tableSchema, tableData) {
    this.host = host
    this.user = user
    this.password = password
    this.database = database
    this.tableData = tableData
  }

  
  insert()
    {
      var con = mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database
      });

      var sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";


      con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("checked if exists");
          });

    }

    createTable()
    {
      var con = mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database
      });

  

      // var sql = `SELECT EXISTS (
      //   SELECT 1
      //   FROM   information_schema.tables 
      //   WHERE  table_schema = 'schema_name'
      //   AND    table_name = 'table_name'
      //   );`

      // check if table exists

        var sql = `CREATE TABLE Loans (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), loan INT)`;

      con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("checked if exists");
          });

    }

  ifExists(database) {
    var con = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
    });

    var sql = `SHOW DATABASES LIKE '${this.database}'`;


    con.query(sql, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        console.log('No table exists')
        var sql = `CREATE DATABASE IF NOT EXISTS ${database}`;

        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("table created");
        });
      } else {
        console.log('table exists')
      }
    });
  }

  init(sql)
  {
    // this.ifExists(this.database)
    console.log(this.tableData)
    this.createTable(sql)

  }
}



