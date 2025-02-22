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
        console.log(req.file);
        const pdfPath = req.file.path;
        const dataBuffer = fs.readFileSync(pdfPath);
        const {Job_Name} = req.body;
        console.log(Job_Name)
        
        const data = await pdfParse(dataBuffer);
        
        
        fs.unlinkSync(pdfPath);
const prompt = data.text;
        
        q(`${prompt} imporve the resume with some key changes according to the job roles  '${Job_Name}'`);

        res.json({ text: data.text });
    } catch (error) {
        console.error("Error processing PDF:", error);
        res.status(500).json({ error: "Error processing PDF", details: error.message });
    }
};

module.exports = pdfupload;
