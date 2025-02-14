import React from "react";


const Login = () => {
  return (
    <div className="flex justify-center items-center w-full h-full pt-28 pb-6 px-2">
      <div className="bg-[#0f172a] p-10 rounded-lg w-[400px] text-center shadow-lg">
        <div className="mb-5">
          {/* <img src={logo} alt="X Logo" className="w-12 mx-auto text-white" /> */}
        </div>
        <h2 className="text-white font-bold text-2xl mb-5">Log in</h2>
        <div className="my-2">
          <button className="w-full p-3 mb-3 bg-white text-black font-bold rounded-xl">
            Sign in with Google
          </button>
        </div>
        <div className="my-2">
          <button className="w-full p-3 bg-[#1da1f2] border border-white text-white font-bold rounded-xl">
            Sign in with Facebook
          </button>
        </div>
        <div className="text-gray-400 my-4">or</div>
        <form className="flex flex-col">
          <input
            type="text"
            placeholder="Phone, email, or username"
            className="p-3 mb-5 rounded-xl border border-gray-600 bg-gray-800 text-white text-sm"
          />
          <button className="bg-[#1da1f2] text-white p-3 rounded-xl font-bold">
            Next
          </button>
          <button className="text-[#1da1f2] mt-3 text-sm">
            Forgot password?
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
