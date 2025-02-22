from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import shutil
import pdfplumber
import pytesseract
from pdf2image import convert_from_path
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()


app = FastAPI()

genai.configure(api_key="AIzaSyCtn5LA2tv8DTYvX8YZXWb-I-6fjaQEkh4")
#AIzaSyCtn5LA2tv8DTYvX8YZXWb-I-6fjaQEkh4

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text

        if text.strip():
            return text.strip()
    except Exception as e:
        print(f"Direct text extraction failed: {e}")

    print("Falling back to OCR for image-based PDF.")
    try:
        images = convert_from_path(pdf_path)
        for image in images:
            page_text = pytesseract.image_to_string(image)
            text += page_text + "\n"
    except Exception as e:
        print(f"OCR failed: {e}")

    return text.strip()

# Function to analyze resume
def analyze_resume(resume_text, job_description=None):
    if not resume_text:
        return {"error": "Resume text is required for analysis."}

    model = genai.GenerativeModel("gemini-1.5-flash")

    base_prompt = f"""
    You are an experienced HR reviewing the provided resume.
    Evaluate the candidate's profile, highlighting strengths, weaknesses, and missing skills.

    Resume:
    {resume_text}
    """

    if job_description:
        base_prompt += f"\n\nCompare the resume with the job description:\n\n{job_description}"

    response = model.generate_content(base_prompt)
    
    return {"analysis": response.text.strip()}

# API Endpoint for resume analysis
@app.post("/analyze-resume/")
async def analyze_resume_api(resume: UploadFile = File(...), job_description: str = Form(None)):
    # Save uploaded file temporarily
    temp_file_path = f"temp_{resume.filename}"
    with open(temp_file_path, "wb") as buffer:
        shutil.copyfileobj(resume.file, buffer)

    # Extract text from PDF
    resume_text = extract_text_from_pdf(temp_file_path)

    if not resume_text:
        os.remove(temp_file_path)
        return JSONResponse(content={"error": "Could not extract text from the PDF. Make sure it's a valid document."}, status_code=400)

    # Analyze resume with Gemini AI
    analysis_result = analyze_resume(resume_text, job_description)

    # Remove temporary file
    os.remove(temp_file_path)
    
    return JSONResponse(content=analysis_result)
