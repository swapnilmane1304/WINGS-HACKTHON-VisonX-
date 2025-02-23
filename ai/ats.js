const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });




const atsGenerator = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text(); 

        // Apply filtering
        console.log("Filtered AI", text);
        return text;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

module.exports = atsGenerator;
