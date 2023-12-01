const express = require("express");
var appForFavQuotes = express.Router();
const mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'dac_quotes'

});

connection.connect();
appForFavQuotes.get("/", (request, response) => {

    var query = `select u.first_name,q.quote from fav_quotes f 
    join users u on f.user_id=u.id 
    join quotes q on f.quote_id=q.id where u.id=${request.body.user_id}`;
    
    connection.query( query, (error, result) => {
        if (error == null) {
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


appForFavQuotes.put("/:id", (request, response) => {
    var query =
        `update tutorials set contents = '${request.body.contents}' where tutorial_id=${request.params.id}`;

                connection.query(query, (error, result) => {

                    if (error == null) {
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

appForFavQuotes.post("/", (request, response) => {
    var query =
       `insert into fav_quotes values (${request.body.user_id,request.body.quote_id})`
                connection.query(query, (error, result) => {

                    if (error == null) {
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

appForFavQuotes.delete("/:id",(request,response)=>{
    var query = `delete from fav_quotes where user_d = ${request.params.user_id}`;

    connection.query(query, (error, result) => {

        if (error == null) {
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


module.exports = appForFavQuotes;