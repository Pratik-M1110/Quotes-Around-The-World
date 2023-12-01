const express =  require("express");
var appForUsers = express.Router();
const mysql = require("mysql");
var connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'manager',
    database: 'dac_quotes'

   });

connection.connect();


// appForUsers.get("/", (request, response)=>{
//     //response.send("EMPS GET IS CALLED");
//     console.log("USERS GET - Request Received...")
//     connection.query("select * from users", (error, result)=>{
//                 if(error==null)
//                 {
//                     var data = JSON.stringify(result) 
//                     response.setHeader("Content-Type","application/json");
//                     response.write(data);
//                 } 
//                 else
//                 {
//                     console.log(error);
//                     response.setHeader("Content-Type","application/json");
//                     response.write(error)
//                 }
//                 response.end();
//     })

// })

appForUsers.get("/:id", (request, response)=>{
    //response.send("EMPS GET IS CALLED");
    // console.log(request.params.id);
    var query = `select * from users where id = ${request.params.id}`;
    connection.query(query, (error, result)=>{
                if(error==null)
                {
                    var data = JSON.stringify(result) 
                    console.log(data);
                    response.setHeader("Content-Type","application/json");
                    response.write(data);
                } 
                else
                {
                    console.log(error);
                    response.setHeader("Content-Type","application/json");
                    response.write(error)
                }
                response.end();
    })

})

//POST = INSERT INTO DB
appForUsers.post("/", (request, response)=>{
    console.log("USERS POST - Request Received...");
    console.log("Data Received is as below..")
    console.log(request.body)
    var query = 
    `insert into users (first_name,last_name,email,passwd,mobile) values(${request.body.first_name}, '${request.body.last_name}','${request.body.email}','${request.body.passwd}','${request.body.mobile}')`;

    connection.query(query, (error, result)=>{
        if(error==null)
        {
            var data = JSON.stringify(result) 
            response.setHeader("Content-Type","application/json");
            response.write(data);
        } 
        else
        {
            console.log(error);
            response.setHeader("Content-Type","application/json");
            response.write(error)
        }
        response.end();
})
})

//PUT = UPDATE INTO DB
appForUsers.put("/:id", (request, response)=>{

    // console.log(request.body)
    // console.log(request.params)

    var query = 
    `update users set first_name = '${request.body.first_name}',
                    last_name = '${request.body. last_name}',
                    email = '${request.body. email}' ,
                    passwd = '${request.body. passwd}' ,
                    mobile = '${request.body. mobile}'  where id = ${request.params.id}`;

    connection.query(query, (error, result)=>{
                        if(error==null)
                        {
                            var data = JSON.stringify(result) 
                            response.setHeader("Content-Type","application/json");
                            response.write(data);
                        } 
                        else
                        {
                            console.log(error);
                            response.setHeader("Content-Type","application/json");
                            response.write(error)
                        }
                        response.end();
                })
})

module.exports = appForUsers;