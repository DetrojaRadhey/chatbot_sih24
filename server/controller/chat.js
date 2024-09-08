const { GoogleGenerativeAI } = require("@google/generative-ai");
const connectDB = require('../config/connectDB');
const dotenv = require('dotenv');

dotenv.config();

module.exports.generateanswer = async(req, res) => {
    try {
        const query = req.body.query;
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

        let connection;
        try {
            connection = await connectDB();
        } catch (error) {
            console.error("Error connecting to database:", error);
            return res.status(500).send({ message: "Internal Server Error" });
        }

        async function run() {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = `Return a sql query based on this user query which can be any language so first detact this: ${query}. 
            Answer it properly because I will directly run on sql database so only return sql query no need to give extra text.
            This is the schema of Museums table: create table Museums (
	        id int primary key,
            name VARCHAR(255) NOT NULL,
            description text,
            timings VARCHAR(100),
            fees DECIMAL(10, 2),
            available_tickets INT,
            location VARCHAR(255)
            ); don't find name directly insted of that use this (WHERE name LIKE '%predicted_name%') like operator.
            If you find irrelevnt query then simply write a query to return all the name of museum.`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            let text = response.text();
            text = text.slice(7,-3);
            res.status(201).send({ message: text });
        }

        run();
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}