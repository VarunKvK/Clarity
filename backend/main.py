import PyPDF2
from fastapi import FastAPI,UploadFile,File,Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from io import BytesIO
import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

app=FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust based on where the frontend is hosted
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

extracted_text=""
genai.configure(api_key=os.getenv("GEMINI_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

def summarize_content(extracted_text):
    # Define the prompt with an f-string to insert the extracted text dynamically
    prompt = f'''
        From the text provided from the PDF, summarize the content to give students a clear understanding of the key concepts. 
        Make the summary structured, including examples where relevant for better understanding.
        
        Text from the PDF:
        {extracted_text}
        
        Provide the response in a structured format.
    '''
    
    # Generate content with the AI model, assuming 'model' is initialized properly
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error in generating summary: {e}")
        return "An error occurred during summarization."


def create_notes(extracted_text):
     # Define the prompt with an f-string to insert the extracted text dynamically
    prompt = f'''
        From the text provided from the PDF, generate notes from the content to give students a clear guidance on what to study. 
        Create the note in a structured format, including examples where relevant for better understanding.
        
        Text from the PDF:
        {extracted_text}
        
        Provide the response in a structured format.
    '''
    
    # Generate content with the AI model, assuming 'model' is initialized properly
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error in generating notes: {e}")
        return "An error occurred during creating notes."
    
def generate_questions(extracted_text):
     # Define the prompt with an f-string to insert the extracted text dynamically
    prompt = f'''
        From the text provided from the PDF, generate 10 question from the content to give students an idea on what all could be asked from the pdf. 
        Create the questions with answers so the students could make sure they have the right answer.
        
        Text from the PDF:
        {extracted_text}
        
        Provide the response in a structured format.
    '''
    
    # Generate content with the AI model, assuming 'model' is initialized properly
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error in generating questions: {e}")
        return "An error occurred during generating questions."

@app.post('/newuploads/')
async def upload_file(file:UploadFile=File(...)):
    global extracted_text
    try:
        content= await file.read()

        with BytesIO(content) as pdf_file:
            content=PyPDF2.PdfReader(pdf_file)
            text=""
            for page_num in range(len(content.pages)):
                page= content.pages[page_num]
                text+= page.extract_text()
                
        extracted_text=text
        # At this point, the PDF content is extracted as text
        return JSONResponse(content={"text": text}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.post('/newtask/')
async def get_task(task: str = Form(...)):
    global extracted_text
    try:
        if task=="summarize":
            response=summarize_content(extracted_text)
            return JSONResponse(content={"Summarized Content":response}, status_code=200)
        elif task=="notes":
            response=create_notes(extracted_text)
            return JSONResponse(content={"Notes":response}, status_code=200)
        if task=="questions":
            response=generate_questions(extracted_text)
            return JSONResponse(content={"Questions":response}, status_code=200)
        else:
            return JSONResponse(content={"error": "Invalid task selected"}, status_code=400)
        
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

