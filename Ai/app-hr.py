from flask import Flask, request, jsonify
import os
import docx2txt
import PyPDF2
import re
from werkzeug.utils import secure_filename
from sentence_transformers import SentenceTransformer, util
from flask_cors import CORS
import spacy

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

model = SentenceTransformer('all-MiniLM-L6-v2')
nlp = spacy.load('en_core_web_sm')

def extract_text(file_path):
    if file_path.endswith('.pdf'):
        text = ""
        with open(file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text()
        return text
    elif file_path.endswith('.docx'):
        return docx2txt.process(file_path)
    elif file_path.endswith('.txt'):
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    else:
        return ""

def extract_name_email(text):
    """Extract name and email from text using NLP."""
    doc = nlp(text)
    email = re.search(r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+", text)
    email = email.group(0) if email else "N/A"
    name = None
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            name = ent.text
            break
    return name or "N/A", email

@app.route('/process', methods=['POST'])
def process_files():
    if 'job_description' not in request.files or 'resumes' not in request.files:
        return jsonify({'error': 'Job description and resumes are required'}), 400

    job_desc_file = request.files['job_description']
    job_desc_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(job_desc_file.filename))
    job_desc_file.save(job_desc_path)
    job_description = extract_text(job_desc_path)

    resume_files = request.files.getlist('resumes')
    resumes_data = []

    for resume_file in resume_files:
        resume_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(resume_file.filename))
        resume_file.save(resume_path)
        resume_text = extract_text(resume_path)
        name, email = extract_name_email(resume_text)
        resumes_data.append({'text': resume_text, 'name': name, 'email': email})

    if not job_description or not resumes_data:
        return jsonify({'error': 'Invalid job description or resumes'}), 400

    job_desc_embedding = model.encode(job_description, convert_to_tensor=True)
    resume_embeddings = model.encode([data['text'] for data in resumes_data], convert_to_tensor=True)

    similarities = util.cos_sim(job_desc_embedding, resume_embeddings).squeeze()

    for i, similarity in enumerate(similarities):
        resumes_data[i]['score'] = round(similarity.item(), 2)

    resumes_data.sort(key=lambda x: x['score'], reverse=True)

    return jsonify({'top_matches': resumes_data}), 200

if __name__ == '__main__':
    app.run(debug=True)












