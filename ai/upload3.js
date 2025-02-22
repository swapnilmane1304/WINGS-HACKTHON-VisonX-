const fs=require('fs')
const pdfParse = require("pdf-parse");
const atsGenerator = require("./ats.js"); // Import AI function

const pdfupload2 = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        console.log(req.file);
        const pdfPath = req.file.path;
        const dataBuffer = fs.readFileSync(pdfPath);
        const {Job_Name} = req.body;
     
        
        const data = await pdfParse(dataBuffer);
        
        
        fs.unlinkSync(pdfPath);
const prompt = data.text;
        
      const score=await atsGenerator(`${prompt} only give the ats score out of 100 and nothing else '${Job_Name}'`);
      console.log("score",score )
        res.json({ text: data.text,score:score});
    } catch (error) {
        console.error("Error processing PDF:", error);
        res.status(500).json({ error: "Error processing PDF", details: error.message });
    }
};

module.exports = pdfupload2;
