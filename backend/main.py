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
    allow_origins=["http://localhost:3000", "https://clarity-lake.vercel.app"],  # Adjust based on where the frontend is hosted
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

extracted_text=""
genai.configure(api_key=os.getenv("GEMINI_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

def summarize_content(extracted_text):
    # prompt = f'''
    #     You are an educational assistant helping students understand complex material. Summarize the following content from a PDF in a way that's easy to understand.
    #     Include key points and organize them logically. Use bullet points for clarity, and add examples where necessary to clarify challenging concepts.

    #     Content:
    #     {extracted_text}

    #     Please format the response as follows:
    #     - The format should be '##' for header , '**' for paragraph and '```' for code snippet
    #     - Based on the file that has been uploaded create a title to make it easy to access by the user.
    #     - The topic heading needs to be bold and also it needs to be the header.
    #     - The paragraphs should be of medium font style and it should be a paragraph.
    #     - Bullet points for key points, definitions, and examples, with a double newline between each bullet for spacing.
    #     - The summary should be concise and easy to understand.
    # '''
    
    prompt = f'''
        Summarize the key concepts and topics from the provided PDF in a clear, structured way that is easy for a beginner to understand. Follow these steps:

        1. Identify the Main Topics:
        - List the main topics or subtopics covered in the PDF.
        - Organize these topics in a logical order, starting with the most fundamental concepts.

        2. Simplify the Explanations:
        - Explain each topic using simple, easy-to-understand language. 
        - Avoid jargon, technical terms, or overly complex sentences.

        3. Use Visual Aids:
        - Incorporate relevant diagrams, illustrations, or flowcharts to help convey the concepts visually.
        - Describe how these visual elements support the explanations.

        4. Provide Examples:
        - Give clear, relatable examples for each key concept to make the ideas more concrete.
        - Explain how the examples help illustrate the topic.

        5. Highlight Key Takeaways:
        - Summarize the most important points or key takeaways that the reader should remember.
        - Emphasize the essential information a beginner needs to understand the subject matter.

        6. Encourage Engagement:
        - Suggest exercises, practice problems, or questions the reader can use to reinforce their understanding.
        - Explain how these interactive elements will help the reader learn the concepts more effectively.

        Output Format:
        Provide the summary in a well-organized, easy-to-read format. Use clear section headings, concise paragraphs, and formatting (e.g., bullet points, numbered lists) to enhance readability. The summary should be comprehensive yet concise, focusing on the key information a beginner needs to grasp the subject matter.
        
        The content is provided below
        Content:
        {extracted_text}
        
    '''
    
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error in generating summary: {e}")
        return "An error occurred during summarization."

def create_notes(extracted_text):
    prompt = f'''
        You are an educational assistant tasked with generating study notes from the following PDF content.
        Create concise, structured notes highlighting the most important points, definitions, and examples for each concept.
        
        Content:
        {extracted_text}

        Please format the notes with:
        - The format should be '##' for header , '**' for paragraph and '```' for code snippet
        - Based on the file that has been uploaded create a title to make it easy to access by the user.
        - **Headers** in bold for each main concept, followed by a double newline for separation.
        - **Bullet points** for key ideas, definitions, and details, with a **double newline between each bullet** for spacing.
        - Examples under each concept as separate bullets with double newlines above and below examples to keep them visually distinct.
        
    '''
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error in generating notes: {e}")
        return "An error occurred during creating notes."

def generate_questions(extracted_text):
    prompt = f'''
        You are an educational assistant tasked with creating study questions from the following PDF content.
        Generate up to 10 questions based on the key ideas and concepts, and provide concise answers.

        Content:
        {extracted_text}

        Please follow these instructions:
        - The format should be '##' for header , '**' for paragraph and '```' for code snippet
        - Based on the file that has been uploaded create a title to make it easy to access by the user.
        - Limit the entire response to under 2000 characters.
        - **Start each question with "Q:"** and each answer with "A:" for clarity.
        - Separate each question-answer pair with **double newlines** for clear formatting.
        - Focus questions on major concepts to assist with effective self-testing.
        
        Keep answers concise to ensure the response remains within the character limit.
    '''
    
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
            return JSONResponse(content={"SummarizedContent":response}, status_code=200)
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

