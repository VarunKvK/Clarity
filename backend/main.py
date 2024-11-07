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

        Provide a set of structured notes from the provided PDF, following these steps:

        1. Pre-Reading and Preparation:
        - Skim through the PDF to get an overview of the content and main topics.
        - Identify the key sections, headings, and any important visuals or diagrams.
        - Consider what you already know about the subject and what you hope to learn.

        2. Active Reading and Highlighting:
        - Read through the PDF actively, pausing to reflect on the information.
        - Use highlighters or digital annotation tools to mark important concepts, definitions, formulas, or examples.
        - Focus on understanding the main ideas, not just memorizing facts.

        3. Structured Note-Taking:
        - Organize your notes in a structured format, such as an outline, mind map, or Cornell method.
        - Use clear headings, subheadings, and bullet points to create a logical flow.
        - Leave space for additional notes and connections between ideas.

        4. Summarization and Key Takeaways:
        - After each section or topic, summarize the main points in your own words.
        - Identify the most critical information, formulas, or concepts that you need to remember.
        - Condense the summary into concise, easily digestible bullet points or short paragraphs.

        5. Visualization and Diagrams:
        - Create visual aids, such as diagrams, flowcharts, or tables, to represent complex concepts.
        - Use colors, shapes, and spatial relationships to help you better understand and remember the information.
        - Explain the visual elements in your notes to solidify your understanding.

        6. Connections and Relationships:
        - Identify connections between different topics or concepts in the PDF.
        - Draw links and cross-references in your notes to create a web of understanding.
        - Explore how the information in the PDF relates to your prior knowledge or other resources.

        7. Review and Reflection:
        - Regularly review your notes to ensure you understand the content.
        - Identify any gaps or areas that need more clarification.
        - Reflect on how the information in the PDF fits into the broader context of the subject.

        8. Practice and Application:
        - Engage in practice problems, exercises, or discussions related to the concepts in the PDF.
        - Apply the knowledge you've gained to new situations or scenarios.
        - Continuously refine and improve your note-taking process based on your performance and feedback.

        Output Format:
        Provide the structured notes in a well-organized, easy-to-read format. Use clear section headings, concise paragraphs, and formatting (e.g., bullet points, diagrams) to enhance the readability and effectiveness of the notes. The output should comprehensively cover the key concepts and information from the PDF, while also showcasing your understanding and ability to apply the knowledge.
        
        The content is provided below
        Content:
        {extracted_text}
    '''
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error in generating notes: {e}")
        return "An error occurred during creating notes."

def generate_questions(extracted_text):
    prompt = f'''
        Generate a comprehensive set of questions and answers based on the provided PDF, following these steps:

        1. Understand the Content:
        - Carefully read through the PDF and ensure you have a solid understanding of the key concepts, definitions, and theories presented.
        - Identify the main topics, subtopics, and any important examples or case studies.

        2. Identify Learning Objectives:
        - Determine the learning objectives or goals that the PDF aims to achieve.
        - Consider what the reader should be able to know, understand, or do after studying the material.

        3. Generate Different Question Types:
        - Create a variety of question types to cover different levels of understanding, such as:
        - Recall questions (e.g., definitions, facts)
        - Comprehension questions (e.g., explanations, interpretations)
        - Application questions (e.g., problem-solving, case studies)
        - Analysis questions (e.g., comparisons, evaluations)
        - Synthesis questions (e.g., creating new ideas, solutions)

        4. Target Key Concepts and Topics:
        - Ensure that your questions cover the essential concepts, theories, and topics presented in the PDF.
        - Prioritize questions that address the most important or foundational information.

        5. Vary Question Formats:
        - Use different question formats to assess understanding, such as:
        - Multiple-choice
        - True/False
        - Fill-in-the-blank
        - Short answer
        - Essay

        6. Provide Detailed Answers:
        - For each question, prepare a comprehensive answer that explains the correct response in detail.
        - Include relevant references to the PDF, formulas, examples, or additional explanations.

        7. Organize the Questions:
        - Group the questions by topic or difficulty level to create a structured question bank.
        - Consider numbering or labeling the questions for easy reference.

        Output Format:
        Provide the set of questions and answers in a well-organized, easy-to-read format. Use clear section headings, concise question formulations, and detailed answer explanations. The output should comprehensively cover the key concepts and information from the PDF, demonstrating your understanding of the subject matter.

        Content:
        {extracted_text}
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

