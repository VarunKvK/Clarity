import PyPDF2
from fastapi import FastAPI,UploadFile,File,Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from io import BytesIO


app=FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust based on where the frontend is hosted
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/newuploads/')
async def upload_file(file:UploadFile=File(...), task: str = Form(...)):
    content= await file.read()
    
    print(task)

    with BytesIO(content) as pdf_file:
        content=PyPDF2.PdfReader(pdf_file)
        text=""
        for page_num in range(len(content.pages)):
            page= content.pages[page_num]
            text+= page.extract_text()
    # At this point, the PDF content is extracted as text
    return text

