const express = require("express");
var appForQuotes = express.Router();
const mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'dac_quotes'

});

connection.connect();
appForQuotes.get("/", (request, response) => {

    var query = `select * from quotes `;
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

appForQuotes.get("/:user_id", (request, response) => {
// console.log(request.params.user_id)
    var query = `select * from quotes where user_id = ${request.params.user_id}`;
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


appForQuotes.put("/:quote_id", (request, response) => {
    var query =
        `update quotes set quote = '${request.body.quote}',author = '${request.body.author}',user_id = '${request.body.user_id}' where id=${request.params.quote_id}`;

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

appForQuotes.post("/", (request, response) => {
    var query =
        //`INSERT INTO quotes VALUES ( ${request.body.tutorial_id},'${request.body.title}','${request.body.publishDate}',${request.body.visits},'${request.body.contents}',${request.body.authorid},${request.body.topic_id})`;
        `INSERT INTO quotes(quote, author, user_id, created_at) VALUES('${request.body.quote}', '${request.body.author}', ${request.body.user_id}, NOW());`;
            //check for created at
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

appForQuotes.delete("/:quote_id",(request,response)=>{
    var query = `delete from quotes where id = ${request.params.quote_id}`;

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


module.exports = appForQuotes;
