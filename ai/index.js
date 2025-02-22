// const express = require("express");


// const pdfupload= require('./upload.js')
// const app = express();
// const PORT = 8000;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json()); // Allow parsing JSON requests

// // Configure Multer for file uploads

// app.post("/upload", upload.single("pdfFile"), pdfupload);

// app.listen(PORT, () => {
//     console.log(`🚀 Server running at http://localhost:${PORT}`);
// });


const express = require("express");
const multer = require("multer");
const cors = require("cors");   
const pdfupload = require("./upload.js"); // Import the upload handler
const pdfupload2 = require("./upload3.js");

const app = express();
const PORT = 8000;
app.use(cors({
    origin: "http://localhost:5173", // Allow requests only from your React app
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type"
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Allow parsing JSON requests

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("pdfFile"), pdfupload);

app.post("/atsScore", upload.single("pdfFile"), pdfupload2);


app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
