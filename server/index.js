const express = require("express");
const app = express();
const connectDB = require('./config/connectDB');
const bodyParser = require("body-parser");
const chatRouter = require("./routes/chat.js");
const cors = require("cors");

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));

connectDB().then(()=>{
    console.log("DB is connected");
});

app.use(express.json());
app.use(bodyParser.json());

app.get("/test",(req,res)=>{
    console.log("Working perfectly");
    res.send("Hello");
});

app.use("/chat",chatRouter);

app.listen(8080,()=>{
    console.log("Server is listening on PORT 8080");
});