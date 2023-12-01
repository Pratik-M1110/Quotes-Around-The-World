const express = require('express');
const config = require('config');

const appforLoginRouter = require("./routes/login");
const appforQuotesRouter = require("./routes/quotes");
const appforUserRouter=require("./routes/users");
var app = express();



app.use((request,response,next)=>{
    response.setHeader("Access-Control-Allow-Origin","*");
    response.setHeader("Access-Control-Allow-Headers","*");
    response.setHeader("Access-Control-Allow-Methods","*");
    next();
});

app.use(express.json());

app.use("/login",appforLoginRouter);
app.use("/quotes",appforQuotesRouter);
app.use("/users",appforUserRouter);


const portNo = config.get("PORT");  

app.listen(portNo,()=>{
    console.log("Server is listening at " + portNo);
})




