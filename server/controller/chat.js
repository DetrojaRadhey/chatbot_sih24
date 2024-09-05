const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports.generateanswer = (req, res) => {
    try {
        const query = req.body.query;
        console.log(process.env.GEMINI_KEY);
        const genAI = new GoogleGenerativeAI("AIzaSyAINmnJehKrrgpCN_9r8jxCuUyUHOZ0weM");

        async function run() {
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
          const prompt = `Answer this query in 5-6 lines: ${query}`;
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text();
          console.log(text);
          res.status(201).send({message: text}); 
        }
    
        run();
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}