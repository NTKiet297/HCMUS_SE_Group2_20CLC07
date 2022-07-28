require('msnodesqlv8');
require('tedious');

const config = require('../dbconfig')

var sql = require("mssql");

  // connect to your database
async function checkExist(username){
    sql.connect(config, function (err) {
      
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query('use QLBANHANG; select * from KHACHHANG', function (err, data) {  
            if (err) console.log(err)
            
            for (var i = 0; i < data.recordsets[0].length; i++) 
            {
                if(data.recordset[i].USERNAME == username){
                  return true;
                }
            }
        });
    });
    
}

async function findOne(username){
  sql.connect(config, function (err) {
      
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    // query to the database and get the records
    request.query('use QLBANHANG; select * from KHACHHANG', function (err, data) {  
        if (err) console.log(err)
        
        for (var i = 0; i < data.recordsets[0].length; i++) 
        {
            if(data.recordset[i].USERNAME == username){
              return data.recordset[i];
            }
        }
    });
});
}

async function addUser(username, password, email){
  if(checkExist(username) === true){ 
    console.log("User already existed")
    return false;
  }
  else{
    sql.connect(config, function (err) {
      
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query("use QLBANHANG; INSERT INTO KHACHHANG(USERNAME, PASS, EMAIL) VALUES('"+username +"', '"+password +"', '"+email +"')", function (err, data) {  
          if (err) console.log(err)
          else console.log("User added successfully")
          return true
        });
    });
  }
}

async function delUser(username){
  if(checkExist(username) === false){ 
    console.log("User not exist")
    return false;
  }
  else{
    sql.connect(config, function (err) {
      
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query("use QLBANHANG; DELETE FROM KHACHHANG WHERE USERNAME ='"+username +"'", function (err, data) {  
          if (err) console.log(err)
          else console.log("User deleted succesfully")
          return true
        });
    });
  }
}

module.exports = {
  checkExist: checkExist,
  addUser: addUser,
  delUser: delUser,
  findOne: findOne
}
