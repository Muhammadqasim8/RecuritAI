import React from 'react';
import Button from './Button';

const stepData = [
  {
    title: 'Upload the Resumes',
    description: 'Candidates upload their resumes to the platform.',
    number: '01',
  },
  {
    title: 'AI-Powered Parsing',
    description: 'AI technology parses resumes to extract key information and skills.',
    number: '02',
  },
  {
    title: 'Skill Extraction',
    description: 'Automatically extract relevant skills and qualifications from resumes.',
    number: '03',
  },
  {
    title: 'Candidate Ranking',
    description: 'Rank candidates based on their qualifications and match with job requirements.',
    number: '04',
  },
];

const Steps = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 w-full py-10">
      <div className="flex flex-col lg:flex-row w-full max-w-screen-lg">
        <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0">
          <h2 className="text-3xl font-bold mb-4 text-center lg:text-start">
            Discover the Power of Our Recruitment Solution
          </h2>
          <p className="text-lg mb-6 text-center lg:text-start">
            Efficient, AI-powered resume parsing, classification, and candidate ranking. 
            Streamline your recruitment process with advanced technology.
          </p>
          <div className="flex justify-center items-center">
            <Button className="bg-[#0f172a] text-base font-medium hover:text-[#0f172a] hover:bg-transparent border-2 border-[#0f172a]">
              Upload Resume
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stepData.map((step, index) => (
            <div
              key={index}
              className="relative p-6 bg-blue-100 rounded-lg hover:bg-blue-200 transition duration-300 transform hover:scale-105 flex flex-col justify-between h-full"
            >
              <h2 className="text-2xl font-semibold">{step.title}</h2>
              <span className="block text-sm pt-2">{step.description}</span>
              <label className="absolute top-4 right-4 text-4xl font-bold">{step.number}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default Steps;
