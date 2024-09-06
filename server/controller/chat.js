const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');

dotenv.config();

module.exports.generateanswer = (req, res) => {
    try {
        const query = req.body.query;
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

        async function run() {
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
          const prompt = `Answer this query: ${query}`;
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text();
          res.status(201).send({message: text}); 
        }
    
        run();
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}