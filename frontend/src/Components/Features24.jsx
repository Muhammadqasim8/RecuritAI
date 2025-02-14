import React, { useState } from 'react';

const features = [
  {
    title: 'Resume Parsing',
    description: 'Efficiently parse and analyze resumes using AI technology.',
    imgAlt: 'AI-powered Resume Parsing',
    imgSrc: 'https://images.unsplash.com/photo-1445620466293-d6316372ab59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyODg0NDY1NXw&ixlib=rb-4.0.3&q=80&w=1080',
  },
  {
    title: 'Candidate Ranking',
    description: 'Automatically classify and categorize candidates.',
    imgAlt: 'Candidate Classification',
    imgSrc: 'https://images.unsplash.com/photo-1674027001860-f9e3a94f4084?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyODg0NDY1Nnw&ixlib=rb-4.0.3&q=80&w=1080',
  },
  {
    title: 'Skill Extraction',
    description: 'Extract skills and qualifications from resumes.',
    imgAlt: 'Skill Extraction',
    imgSrc: 'https://images.unsplash.com/photo-1706701700545-daa073ec568b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyODg0NDY1N3w&ixlib=rb-4.0.3&q=80&w=1080',
  },
];

const Features24 = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="py-12">
      <h1 className='pt-4 pb-20 text-center text-3xl px-[4px] sm:text-5xl font-semibold text-[#2B2A2D] font-serif'>Features</h1>
      <div className="px-4 max-w-7xl mx-auto grid gap-8 lg:grid-cols-2">
        {/* Image Container */}
        <div className="h-full w-full flex items-center justify-center rounded-md overflow-hidden bg-white shadow-lg">
          <img
            alt={features[activeTab].imgAlt}
            src={features[activeTab].imgSrc}
            className="object-cover w-full h-80 rounded-md"
          />
        </div>

        {/* Tabs Container */}
        <div className="flex flex-col space-y-6 overflow-y-auto" style={{ maxHeight: '300px', scrollbarWidth: 'none' }}>
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => setActiveTab(index)}
              className={`cursor-pointer flex items-center space-x-4 p-4 rounded-md transition ${activeTab === index ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
            >
              <div className={`w-1 h-full ${activeTab === index ? 'bg-blue-500' : ''}`}></div>
              <div>
                <h2 className="text-lg font-semibold">{feature.title}</h2>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features24;
