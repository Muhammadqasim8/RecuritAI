from flask import Flask, request, jsonify
import os
import docx2txt
import PyPDF2
import re
from werkzeug.utils import secure_filename
from sentence_transformers import SentenceTransformer, util
from flask_cors import CORS
import spacy
import nltk
from nltk.corpus import wordnet

# Download WordNet for synonyms
nltk.download('wordnet', quiet=True)

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

model = SentenceTransformer('all-MiniLM-L6-v2')
nlp = spacy.load('en_core_web_sm')

# Common tech skills dictionary with synonyms
SKILLS_DICT = {
    'python': ['python', 'py', 'python3'],
    'javascript': ['javascript', 'js', 'ecmascript'],
    'typescript': ['typescript', 'ts'],
    'java': ['java', 'j2ee', 'java ee', 'java se'],
    'c++': ['c++', 'cpp', 'c plus plus'],
    'c#': ['c#', 'csharp', 'c sharp'],
    'php': ['php'],
    'ruby': ['ruby', 'rails', 'ruby on rails'],
    'swift': ['swift', 'swift programming'],
    'go': ['go', 'golang'],
    'rust': ['rust', 'rust programming'],
    'kotlin': ['kotlin'],
    'r': ['r', 'r programming', 'r language'],
    'scala': ['scala'],
    'sql': ['sql', 'mysql', 'postgresql', 'oracle', 'tsql', 't-sql', 'plsql', 'pl/sql'],
    'nosql': ['nosql', 'mongodb', 'dynamodb', 'cosmosdb', 'cassandra'],
    'html': ['html', 'html5'],
    'css': ['css', 'css3', 'scss', 'sass', 'less'],
    'react': ['react', 'reactjs', 'react.js'],
    'angular': ['angular', 'angularjs', 'angular.js'],
    'vue': ['vue', 'vuejs', 'vue.js'],
    'node': ['node', 'nodejs', 'node.js'],
    'express': ['express', 'expressjs', 'express.js'],
    'django': ['django'],
    'flask': ['flask'],
    'spring': ['spring', 'spring boot', 'spring framework'],
    'aws': ['aws', 'amazon web services', 'ec2', 's3', 'lambda'],
    'azure': ['azure', 'microsoft azure'],
    'gcp': ['gcp', 'google cloud', 'google cloud platform'],
    'docker': ['docker', 'container', 'containerization'],
    'kubernetes': ['kubernetes', 'k8s'],
    'jenkins': ['jenkins', 'ci/cd'],
    'git': ['git', 'github', 'gitlab', 'version control'],
    'agile': ['agile', 'scrum', 'kanban'],
    'machine learning': ['machine learning', 'ml', 'tensorflow', 'pytorch', 'scikit-learn'],
    'artificial intelligence': ['artificial intelligence', 'ai'],
    'data science': ['data science', 'data analysis', 'data analytics'],
    'big data': ['big data', 'hadoop', 'spark', 'hive'],
    'blockchain': ['blockchain', 'cryptocurrency', 'bitcoin', 'ethereum'],
    'devops': ['devops', 'devsecops', 'sre'],
    'testing': ['testing', 'qa', 'quality assurance', 'junit', 'selenium'],
    'security': ['security', 'cybersecurity', 'infosec', 'information security'],
}

def extract_text(file_path):
    """Extract text from PDF, DOCX, or TXT files."""
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

def extract_skills_and_experience(text):
    """Extract skills and experience requirements from text."""
    # Normalize text for better matching
    text_lower = text.lower()
    
    # Find skills using dictionary
    found_skills = []
    for skill_group, synonyms in SKILLS_DICT.items():
        for synonym in synonyms:
            pattern = r'\b' + re.escape(synonym) + r'\b'
            if re.search(pattern, text_lower):
                if skill_group not in found_skills:
                    found_skills.append(skill_group)
    
    # Extract experience requirements
    experience_patterns = [
        r'\b(\d+\+?\s+years?\s+(?:of\s+)?(?:experience|work(?:ing)?)\s+(?:in|with)?\s+[^.]*)',
        r'\b((?:experience|work(?:ing)?)\s+(?:of|with)?\s+\d+\+?\s+years?\s+[^.]*)',
        r'\b(minimum\s+(?:of\s+)?\d+\+?\s+years?\s+(?:of\s+)?(?:experience|work(?:ing)?)\s+[^.]*)'
    ]
    
    experience_requirements = []
    for pattern in experience_patterns:
        matches = re.findall(pattern, text_lower)
        experience_requirements.extend(matches)
    
    # Extract education requirements
    education_patterns = [
        r"\b(bachelor'?s?|master'?s?|phd|doctorate|degree|bs|ba|ms|mba)\s+(?:degree\s+)?(?:in\s+)?([^.,;]*)",
        r"\b(high school|associate'?s?)\s+(?:diploma|degree)"
    ]
    
    education = []
    for pattern in education_patterns:
        matches = re.findall(pattern, text_lower)
        if isinstance(matches[0], tuple) if matches else False:
            education.extend([' '.join(match) for match in matches])
        else:
            education.extend(matches)
    
    return found_skills, experience_requirements, education

def compare_skills(resume_skills, job_skills):
    """Compare resume skills with job requirements."""
    resume_skills_lower = [skill.lower() for skill in resume_skills]
    job_skills_lower = [skill.lower() for skill in job_skills]
    
    # Calculate matching skills
    matching_skills = [skill for skill in job_skills_lower if skill in resume_skills_lower]
    
    # Calculate missing skills
    missing_skills = [skill for skill in job_skills_lower if skill not in resume_skills_lower]
    
    # Calculate match score
    if not job_skills_lower:
        match_score = 0
    else:
        match_score = (len(matching_skills) / len(job_skills_lower)) * 100
    
    return round(match_score, 2), matching_skills, missing_skills

def generate_recommendations(missing_skills, resume_skills, job_experience, resume_experience):
    """Generate recommendations for improving resume."""
    recommendations = []
    
    # Skill recommendations
    if missing_skills:
        recommendations.append(f"Add these missing skills to your resume: {', '.join(missing_skills)}")
        
        for skill in missing_skills:
            similar_skills = [s for s in resume_skills if s in SKILLS_DICT.get(skill, [])]
            if similar_skills:
                recommendations.append(f"Consider highlighting your {similar_skills[0]} experience as it relates to {skill}")
    
    # Experience recommendations
    if job_experience and not resume_experience:
        recommendations.append("Include a dedicated 'Experience' section with years of experience clearly mentioned")
    
    # General recommendations
    recommendations.extend([
        "Quantify your achievements with numbers and percentages where possible",
        "Tailor your resume summary to match this specific job description",
        "Use action verbs at the beginning of bullet points to describe accomplishments"
    ])
    
    return recommendations

@app.route('/process', methods=['POST'])
def process_files():
    """Legacy endpoint for recruiter-focused matching."""
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

@app.route('/candidate-check', methods=['POST'])
def candidate_check():
    """New endpoint for candidate-focused resume improvement."""
    if 'resume' not in request.files or 'job_description' not in request.files:
        return jsonify({'error': 'Both resume and job description are required'}), 400
    
    # Process uploaded files
    resume_file = request.files['resume']
    job_desc_file = request.files['job_description']
    
    resume_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(resume_file.filename))
    job_desc_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(job_desc_file.filename))
    
    resume_file.save(resume_path)
    job_desc_file.save(job_desc_path)
    
    resume_text = extract_text(resume_path)
    job_desc_text = extract_text(job_desc_path)
    
    if not resume_text or not job_desc_text:
        return jsonify({'error': 'Invalid resume or job description'}), 400
    
    # Extract name and email from resume
    name, email = extract_name_email(resume_text)
    
    # Extract skills and experience from both documents
    resume_skills, resume_experience, resume_education = extract_skills_and_experience(resume_text)
    job_skills, job_experience, job_education = extract_skills_and_experience(job_desc_text)
    
    # Get semantic similarity score
    resume_embedding = model.encode(resume_text, convert_to_tensor=True)
    job_desc_embedding = model.encode(job_desc_text, convert_to_tensor=True)
    semantic_similarity = util.cos_sim(resume_embedding, job_desc_embedding).item()
    
    # Compare skills
    skill_match_score, matching_skills, missing_skills = compare_skills(resume_skills, job_skills)
    
    # Generate recommendations
    recommendations = generate_recommendations(missing_skills, resume_skills, job_experience, resume_experience)
    
    # Calculate overall match score (blend of semantic and skill-based matching)
    overall_match_score = (skill_match_score * 0.7) + (semantic_similarity * 100 * 0.3)
    
    return jsonify({
        'candidate_name': name,
        'candidate_email': email,
        'overall_match_score': round(overall_match_score, 2),
        'skill_match_score': skill_match_score,
        'semantic_similarity_score': round(semantic_similarity * 100, 2),
        'matching_skills': matching_skills,
        'missing_skills': missing_skills,
        'job_experience_requirements': job_experience,
        'job_education_requirements': job_education,
        'resume_skills': resume_skills,
        'recommendations': recommendations
    }), 200

if __name__ == '__main__':
    app.run(debug=True)