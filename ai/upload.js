// const multer = require("multer");
// const fs = require("fs");
// const pdfParse = require("pdf-parse");
// const upload = multer({ dest: "uploads/" });

// const pdfupload = async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: "No file uploaded" });
//     }

//     try {
//         const pdfPath = req.file.path;
//         const dataBuffer = fs.readFileSync(pdfPath);
        
//         // Extract text from PDF
//         const data = await pdfParse(dataBuffer);
        
//         // Delete the uploaded file after processing
//         fs.unlinkSync(pdfPath);

//         res.json({ text: data.text });


//     } catch (error) {
//         console.error("Error processing PDF:", error);
//         res.status(500).json({ error: "Error processing PDF", details: error.message });
//     }
// }

// module.exports = pdfupload

const fs=require('fs')
const pdfParse = require("pdf-parse");
const q = require("./generate.js"); // Import AI function

const pdfupload = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const pdfPath = req.file.path;
        const dataBuffer = fs.readFileSync(pdfPath);
        const { Job_Name } = req.body;

        console.log("Processing for Job:", Job_Name);
        const data = await pdfParse(dataBuffer);

        fs.unlinkSync(pdfPath); // Remove file after parsing
        const prompt = `${data.text} return key point in resume '${Job_Name}'`;

        const improvedResume = await q(prompt); // Await AI response
        console.log("reponse",)
        res.json({ text: improvedResume || "Error generating response" });
    } catch (error) {
        console.error("Error processing PDF:", error);
        res.status(500).json({ error: "Error processing PDF", details: error.message });
    }
};


module.exports = pdfupload;
