import React from "react";

const Registration = () => {
  return (
    <div className="flex justify-center items-center w-full h-full pt-28 pb-6 px-2">
      <div className="bg-[#0f172a] p-10 rounded-lg w-[400px] text-center shadow-lg">
        <div className="mb-5">
          {/* <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAh1BMVEX///8AAAD8/Pzz8/... "
            alt="X Logo"
            className="w-12 mx-auto"
          /> */}
        </div>
        <h2 className="text-white font-bold text-2xl mb-5">Create your account</h2>
        <form className="flex flex-col">
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 mb-5 rounded-xl border border-gray-600 bg-gray-800 text-white text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 mb-5 rounded-xl border border-gray-600 bg-gray-800 text-white text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 mb-5 rounded-xl border border-gray-600 bg-gray-800 text-white text-sm"
          />
          <button className="bg-[#1da1f2] text-white p-3 rounded-xl font-bold">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
