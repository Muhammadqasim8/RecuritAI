import React from 'react';

const testimonials = [
  {
    authorAlt: 'Image of John Doe',
    authorSrc: 'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyODg0NDY1NHw&ixlib=rb-4.0.3&q=80&w=1080',
    authorName: 'John Doe',
    authorPosition: 'HR Manager',
    review: 'Recruit AI has revolutionized our recruitment process. The AI-powered resume parsing and candidate ranking features have saved us valuable time and helped us find top talent efficiently.',
    stars: '5 stars',
  },
  {
    authorAlt: 'Image of Jane Smith',
    authorSrc: 'https://images.unsplash.com/photo-1542513217-0b0eedf7005d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyODg0NDY1NXw&ixlib=rb-4.0.3&q=80&w=1080',
    authorName: 'Jane Smith',
    authorPosition: 'Senior Recruiter',
    review: 'Recruit AI\'s skill extraction capabilities are unmatched. It has made it easier for us to identify the right candidates based on their skills and experience.',
    stars: '5 stars',
  },
  {
    authorAlt: 'Image of Michael Johnson',
    authorSrc: 'https://images.unsplash.com/photo-1541190990694-4a612732721c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyODg0NDY1Nnw&ixlib=rb-4.0.3&q=80&w=1080',
    authorName: 'Michael Johnson',
    authorPosition: 'Talent Acquisition Specialist',
    review: 'Highly recommend Recruit AI for any company looking to streamline their recruitment process. The platform is user-friendly and the candidate classification feature is a game-changer.',
    stars: '5 stars',
  },
  {
    authorAlt: 'Image of Sarah Lee',
    authorSrc: 'https://images.unsplash.com/photo-1695747003514-83297acc8de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTcyODg0NDY1NXw&ixlib=rb-4.0.3&q=80&w=1080',
    authorName: 'Sarah Lee',
    authorPosition: 'Recruitment Coordinator',
    review: 'Recruit AI has exceeded our expectations. The candidate ranking system has helped us prioritize our hiring needs effectively.',
    stars: '5 stars',
  }
];

const Testimonial17 = () => {
  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Testimonials</h2>
        <p className="text-lg text-center px-5 md:px-3 text-gray-600 mb-12">Recruit AI has revolutionized our recruitment process. The AI-powered resume parsing and candidate ranking features have saved us valuable time and helped us find top talent efficiently.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-5">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src={testimonial.authorSrc}
                  alt={testimonial.authorAlt}
                />
                <div className="ml-4 text-left">
                  <strong className="text-lg font-semibold text-gray-800">
                    {testimonial.authorName}
                  </strong>
                  <p className="text-sm text-gray-500">{testimonial.authorPosition}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-left">{testimonial.review}</p>
              <span className="block text-left font-bold text-yellow-500">{testimonial.stars}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial17;
