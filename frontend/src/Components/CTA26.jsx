import React from 'react';

const ctaData = [
  {
    heading: 'Join Recruit AI Today',
    content: 'Experience the power of AI in recruitment',
    action: 'Sign Up Now',
  },
  // Add more CTA objects as needed
];

const CTA26 = () => {
  return (
    <div className="py-16">
      <div className="px-4 max-w-screen-xl mx-auto">
        {ctaData.map((cta, index) => (
          <div
            key={index}
            className="px-4 relative flex items-center justify-between bg-black hover:bg-blue-300 hover:scale-105 transition-transform duration-300 rounded-xl mb-6"
          >
            <div className="px-4 relative flex flex-col sm:flex-row items-center justify-between text-black bg-blue-300 hover:bg-black rotate-[-2deg] rounded-xl w-full p-16">
              <div className="flex flex-col gap-6">
                <span className="text-4xl font-semibold text-white">
                  {cta.heading}
                </span>
                <p className="text-lg text-white">{cta.content}</p>
              </div>
              <div className="flex flex-col items-end gap-6">
                <button
                  type="button"
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
                >
                  <span>{cta.action}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CTA26;
