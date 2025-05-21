from flask import Flask, request, jsonify
import os
import docx2txt
import PyPDF2
import re
from werkzeug.utils import secure_filename
from sentence_transformers import SentenceTransformer, util
from flask_cors import CORS
import spacy

# Initialize app and config
app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load ML/NLP models
model = SentenceTransformer('all-MiniLM-L6-v2')
nlp = spacy.load('en_core_web_sm')

# Extract text from uploaded files
def extract_text(file_path):
    if file_path.endswith('.pdf'):
        text = ""
        with open(file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                if page.extract_text():
                    text += page.extract_text()
        return text
    elif file_path.endswith('.docx'):
        return docx2txt.process(file_path)
    elif file_path.endswith('.txt'):
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    return ""

# Extract skills and experience
def extract_skills_and_experience(text):
    # Extend this list as needed
    skill_keywords = ['Python', 'JavaScript', 'Java', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'HTML', 'CSS']
    skills_found = []

    for skill in skill_keywords:
        if re.search(rf"\b{re.escape(skill)}\b", text, re.IGNORECASE):
            skills_found.append(skill)

    experience_patterns = re.findall(
        r'\b\d+\+?\s+(?:years?|yrs?)\s+(?:of\s+)?(?:experience|exp)\b.*?(?:\sin\s+[a-zA-Z ]+)?',
        text,
        re.IGNORECASE
    )

    return list(set(skills_found)), list(set(experience_patterns))

# Skill comparison logic
def compare_skills(resume_skills, job_skills):
    matched = [skill for skill in job_skills if skill.lower() in map(str.lower, resume_skills)]
    missing = [skill for skill in job_skills if skill.lower() not in map(str.lower, resume_skills)]
    score = (len(matched) / len(job_skills)) * 100 if job_skills else 0
    return round(score, 2), matched, missing

# Main endpoint
@app.route('/api/candidate-match', methods=['POST'])
def candidate_match():
    if 'resume' not in request.files or 'job_description' not in request.files:
        return jsonify({'error': 'Resume and job description files are required.'}), 400

    resume_file = request.files['resume']
    job_desc_file = request.files['job_description']

    resume_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(resume_file.filename))
    job_desc_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(job_desc_file.filename))

    resume_file.save(resume_path)
    job_desc_file.save(job_desc_path)

    resume_text = extract_text(resume_path)
    job_text = extract_text(job_desc_path)

    if not resume_text or not job_text:
        return jsonify({'error': 'Could not extract text from files.'}), 400

    # Skill/Experience Extraction
    resume_skills, resume_experience = extract_skills_and_experience(resume_text)
    job_skills, job_experience = extract_skills_and_experience(job_text)

    # Match score
    match_score, matched, missing = compare_skills(resume_skills, job_skills)

    # Semantic similarity
    job_embedding = model.encode(job_text, convert_to_tensor=True)
    resume_embedding = model.encode(resume_text, convert_to_tensor=True)
    similarity_score = round(util.cos_sim(job_embedding, resume_embedding).item() * 100, 2)

    # Recommendations
    suggestions = [f"Consider adding '{skill}' to your resume." for skill in missing]

    return jsonify({
        'match_score_percent': match_score,
        'semantic_similarity_percent': similarity_score,
        'matched_skills': matched,
        'missing_skills': missing,
        'experience_in_resume': resume_experience,
        'experience_required': job_experience,
        'recommendations': suggestions
    }), 200

if __name__ == '__main__':
    app.run(debug=True)
