// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI("AIzaSyAKpqRjEbSEz-dgNXTdv3e-yafbwtTxUJ4");

// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const q = async (prompt) => {
//     try {
//         const result = await model.generateContent(prompt);
//         const response = await result.response; 
//         const text = await response.text(); // Wait for text extraction
//         console.log("AI Response:", text);
//         return text;
//     } catch (error) {
//         console.error("Error:", error);
//         return null;
//     }
// };


// module.exports = q; // Export function

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAKpqRjEbSEz-dgNXTdv3e-yafbwtTxUJ4");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const filterResponse = (text) => {
    if (!text) return "No response received.";

    // Remove asterisks (*) from text
    text = text.replace(/\*/g, "");

    // Trim whitespace and remove excessive blank lines
    let lines = text.trim().split("\n").filter(line => line.trim() !== "");

    // Remove duplicate lines
    let uniqueLines = [...new Set(lines)];

    // Join back into a filtered response
    let filteredText = uniqueLines.join("\n");

    // Limit response length (e.g., max 1500 characters)
   

    return filteredText;
};


const q = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text(); 

        const filteredText =filterResponse(text); // Apply filtering
        console.log("Filtered AI Response:", filteredText);
        return filteredText;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};
module.exports = q;
// Example usage


// In your terminal, first run:
// npm install openai

// import OpenAI from "openai";

// const client = new OpenAI({
//     apiKey: `xai-i8D0LFbAl5xTQYqXNqc4l1IGZfSJDJ0t4UYwRHYPg4OB5s5YdaJWDchjdtdvmRgnyIHQIRe5793HRLNS`,
//     baseURL: "https://api.x.ai/v1",
// });

// const completion = await client.chat.completions.create({
//     model: "grok-2-latest",
//     messages: [
//         {
//             role: "system",
//             content:
//                 "You are Grok, a chatbot inspired by the Hitchhiker's Guide to the Galaxy.",
//         },
//         {
//             role: "user",
//             content:
//                 "What is the meaning of life, the universe, and everything?",
//         },
//     ],
// });

// console.log(completion.choices[0].message.content);



// import OpenAI from "openai";

// const baseURL = "https://api.aimlapi.com/v1";

// // Insert your AIML API Key in the quotation marks instead of my_key:
// const apiKey = "b568effe46fc40dbbd0606d56a0f436c"; 

// const systemPrompt = "You are a travel agent. Be descriptive and helpful";
// const userPrompt = "Tell me about San Francisco";




// const api = new OpenAI({
//   apiKey,
//   baseURL,
// });

// const main = async () => {
//   try {
//     const completion = await api.chat.completions.create({
//     model: "mistralai/Mistral-7B-Instruct-v0.2",
//     messages: [
//       {
//         role: "system",
//         content: systemPrompt,
//       },
//       {
//         role: "user",
//         content: userPrompt,
//       },
//     ],
//     temperature: 0.7,
//     max_tokens: 256,
//   });

//   console.log("data ",completion);
//   } catch (error) {
//     throw new Error(error);
//   }
// };

//   const q = async (prompt) => {
//     try {
        
//         const response = completion.choices[0].message.content;
        
        
//     } catch (error) {
//         console.error("Error:", error);
//     }
// };



//   console.log("User:", userPrompt);
//   console.log("AI:", response);


// main().then(item=>{
//     console.log("api connected successfully")
// }).catch(()=>{
//     console.log("npt connected");
// });


// import OpenAI from "openai";

// const baseURL = "https://api.aimlapi.com/v1";

// // Insert your AIML API Key in the quotation marks instead of my_key:
// const apiKey = "b568effe46fc40dbbd0606d56a0f436c"; 

// const systemPrompt = "You are a travel agent. Be descriptive and helpful";
// const userPrompt = "Tell me about San Francisco";

// const api = new OpenAI({
//   apiKey,
//   baseURL,
// });

// const main = async () => {
//   const completion = await api.chat.completions.create({
//     model: "mistralai/Mistral-7B-Instruct-v0.2",
//     messages: [
//       {
//         role: "system",
//         content: systemPrompt,
//       },
//       {
//         role: "user",
//         content: userPrompt,
//       },
//     ],
//     temperature: 0.7,
//     max_tokens: 256,
//   });

//   const response = completion.choices[0].message.content;

//   console.log("User:", userPrompt);
//   console.log("AI:", response);
// };

// main();


// const q = async (prompt) => {
    //     try {
    //         const result = await model.generateContent(prompt);
    //         const response = await result.response; 
            
    //         console.log("AI Response:", response.text());
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // };