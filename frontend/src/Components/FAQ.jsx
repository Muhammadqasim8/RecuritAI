import React, { useState } from 'react';
import arow from "../assets/arrow.png";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqItems = [
    { 
      question: "🤖 How does Recruit AI classify resumes?", 
      answer: "Recruit AI uses advanced AI models like BERT and NLP techniques to classify resumes. It analyzes the content, extracting key skills, experiences, and relevant details, then matches them with predefined job categories (e.g., web development, mobile development) to provide a job-specific classification." 
    },
    { 
      question: "📄 Can Recruit AI handle different file formats?", 
      answer: "Yes! Recruit AI supports both PDF and Word documents. Our system converts these files into text for further processing. It even handles errors if an unsupported format is uploaded, ensuring smooth operation for users." 
    },
    { 
      question: "🧠 How does the AI match resumes to job descriptions?", 
      answer: "Recruit AI uses NLP-based models like Named Entity Recognition (NER) to extract important skills and experiences from resumes. It then matches these details with job descriptions using semantic similarity algorithms, assigning a match score based on relevance." 
    },
    { 
      question: "🌟 What scoring system does Recruit AI use to grade resumes?", 
      answer: "Our AI-powered grading module scores resumes on a scale of 1-100 based on the match between the resume and the job description. It factors in skills, experience, and keywords, giving recruiters clear reasons for each score, such as '80% of required skills matched.'" 
    },
    { 
      question: "📊 Can Recruit AI rank candidates for recruiters?", 
      answer: "Absolutely! Recruit AI ranks candidates based on their AI-calculated resume scores, experience, and skill relevance. This ranking is displayed in the recruiter dashboard, helping recruiters easily find the best matches for their job openings." 
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='flex justify-center w-full flex-col gap-8 px-4 py-4'>
      <h2 className='flex justify-center w-full text-3xl font-bold text-[#444240]'>Frequently Asked Questions</h2>
      <div className='text-start md:text-center text-[#444240]'>Do you have a question that isn't answered here? Sign out and send us a message</div>
      <div className='flex flex-1 justify-center flex-col items-center'>
        {faqItems.map((item, index) => (
          <div key={index} className='py-4 border-b max-w-[576px] w-full'>
            <div
              className='flex justify-start items-center gap-4 cursor-pointer group'
              onClick={() => handleToggle(index)}
            >
              <img
                src={arow}
                alt="Toggle Arrow"
                className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
              />
              <p className='text-[#444240] text-sm font-light group-hover:underline'>{item.question}</p>
            </div>
            {openIndex === index && (
              <div className='mt-2 pl-8 text-sm font-light text-[#444240]'>
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
