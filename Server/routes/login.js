const express = require('express');
var appforLoginRouter = express.Router();
const mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'dac_quotes'

});

connection.connect();


appforLoginRouter.post("/", (request, response) => {
    var query = `select * from users where email='${request.body.email}' and passwd='${request.body.passwd}'`;

connection.query(query, (error, result) => {

                    if (error === null) {
                        var data = JSON.stringify(result);
                        response.setHeader("Content-Type", "application/json");
                        response.write(data);
                    }
                    else {
                        console.log(error);
                        response.setHeader("Content-Type", "application/json");
                        response.write(error);
                    }
                    response.end();
    })
})



module.exports = appforLoginRouter;


