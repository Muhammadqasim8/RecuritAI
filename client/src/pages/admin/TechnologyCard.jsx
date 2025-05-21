import React from 'react';

// Technology icons (imported from wherever you store SVG icons in your project)
// For simplicity, I'm using SVG inline but you might want to import them from files
const getTechnologyIcon = (iconName) => {
  switch (iconName) {
    case 'react':
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-blue-500">
          <path fill="currentColor" d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85s-1.87-.85-1.87-1.85c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9-.82-.08-1.63-.2-2.4-.36-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68 0 1.69-1.83 2.93-4.37 3.68.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68 0-1.69 1.83-2.93 4.37-3.68-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96.77-.16 1.58-.28 2.4-.36.48-.67.99-1.31 1.51-1.9z" />
        </svg>
      );
    case 'node':
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-green-600">
          <path fill="currentColor" d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.71.47 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.45 16.5a.26.26 0 01-.11-.21V7.71c0-.09.04-.17.11-.21l7.44-4.29c.06-.04.16-.04.22 0l7.44 4.29c.07.04.11.12.11.21v8.58c0 .08-.04.16-.11.21l-7.44 4.29c-.06.04-.16.04-.23 0L10 19.65c-.08-.03-.16-.04-.21-.01-.53.3-.64.36-1.14.52-.12.04-.31.11.07.32l2.48 1.47c.24.14.5.21.78.21s.54-.07.78-.21l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.78-.2M14 8c-2.12 0-3.39.89-3.39 2.39 0 1.61 1.26 2.08 3.3 2.28 2.43.24 2.62.6 2.62 1.08 0 .83-.67 1.18-2.23 1.18-1.98 0-2.4-.49-2.55-1.47a.226.226 0 00-.22-.18h-.96c-.12 0-.21.09-.21.22 0 1.24.68 2.74 3.94 2.74 2.35 0 3.7-.93 3.7-2.55 0-1.61-1.08-2.03-3.37-2.34-2.31-.3-2.54-.46-2.54-1 0-.45.2-1.05 1.91-1.05 1.5 0 2.09.33 2.32 1.36.02.1.11.17.21.17h.97c.05 0 .11-.02.15-.07.04-.04.07-.1.05-.16C19.21 8.57 17.82 8 14 8z" />
        </svg>
      );
    case 'flutter':
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-cyan-500">
          <path fill="currentColor" d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357L14.314 0zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z" />
        </svg>
      );
    case 'brain':
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-purple-600">
          <path fill="currentColor" d="M13 3v2.5h1V7h-3V5.5h1V3.25c-.5-.16-1-.24-1.5-.24c-2.37 0-4.11 1.92-4.15 4.15C6.29 10.47 8.28 13 11 13v-2c-1.46 0-2.55-1.04-2.71-2.3c-.17-1.26.61-2.7 2.21-2.7c.25 0 .5.05.75.16V9h2V8h3v3h-1.5v3c2.72 0 4.71-2.53 4.65-5.09c-.04-2.23-1.78-4.15-4.15-4.15c-.5 0-1 .08-1.5.24M0 18.97v-2c13.08.03 19.08.06 24 .08v2h-2c-1.75 0-2.99.61-4.25 1.25C16.5 21 15 22 13 22c-2.01 0-3.5-1-4.75-1.7C6.99 19.66 5.75 19.05 4 19.05H0Z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-gray-500">
          <path fill="currentColor" d="M12 2L1 21h22L12 2zm0 4.3L18.1 19H5.9L12 6.3z" />
        </svg>
      );
  }
};

// Function to get background color based on technology color
const getBackgroundColor = (color) => {
  const colorMap = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    cyan: 'bg-cyan-50',
    purple: 'bg-purple-50',
  };
  return colorMap[color] || 'bg-gray-50';
};

// Function to get border color based on technology color
const getBorderColor = (color) => {
  const colorMap = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    cyan: 'border-cyan-500',
    purple: 'border-purple-500',
  };
  return colorMap[color] || 'border-gray-500';
};

const TechnologyCard = ({ technology, onClick }) => {
  const { name, icon, color } = technology;
  const bgColor = getBackgroundColor(color);
  const borderColor = getBorderColor(color);

  // Sample values - in a real app these would be dynamic
  const testCount = Math.floor(Math.random() * 10) + 1;
  const questionCount = Math.floor(Math.random() * 50) + 10;
  
  return (
    <div 
      className={`bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:shadow-xl border-t-4 ${borderColor}`}
      onClick={onClick}
    >
      <div className={`flex items-center justify-between p-6 ${bgColor}`}>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {testCount} Tests
            </div>
            <div className="flex items-center text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {questionCount} Questions
            </div>
          </div>
        </div>
        <div className="ml-4">
          {getTechnologyIcon(icon)}
        </div>
      </div>
      
      <div className="p-6 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">Last updated: 3 days ago</p>
          <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center transition-colors duration-200">
            <span>View Tests</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechnologyCard;