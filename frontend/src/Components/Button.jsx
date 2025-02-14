import React from 'react';

const Button = ({ children, className }) => {
  return (
    <button className={`  text-white px-4 py-2 rounded-[1920px] ${className}`}>
      {children}
    </button>
  );
};

export default Button;
