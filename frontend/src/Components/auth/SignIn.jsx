import React, { useState } from 'react';
import bufferlogo from '../../assets/bufferlogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/authService'; // Import the login service

export function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      alert('Please enter your email and password');
      return;
    }

    try {
      const result = await login(email, password);  // Call the login service
      localStorage.setItem('token', result.token);  // Store the JWT token
      alert('Login successful');
      navigate('/');  // Redirect to home page after successful login
    } catch (error) {
      setError(error.message);  // Display any errors to the user
    }
  };

  return (
    <div className="bg-[#1e1e2e] flex justify-center items-center h-screen font-sans">
      <div className="flex justify-center items-center w-full h-full">
        <div className="bg-black p-10 rounded-lg w-[400px] text-center shadow-lg">
          <div className="mb-5">
            <img src={bufferlogo} alt="X Logo" className="w-12 mx-auto" />
          </div>
          <h2 className="text-white font-bold text-2xl mb-5">Sign in to Buffer</h2>
          <form className="flex flex-col" onSubmit={handleLoginClick}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
              className="p-3 mb-5 rounded-xl border border-gray-600 bg-gray-800 text-white text-sm"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleInputChange}
              className="p-3 mb-5 rounded-xl border border-gray-600 bg-gray-800 text-white text-sm"
            />
            {error && <div className="text-red-500 mb-3">{error}</div>}
            <button
              type="submit"
              className="bg-[#1da1f2] text-white p-3 rounded-xl font-bold"
            >
              Sign In
            </button>
            <button className="text-[#1da1f2] mt-3 text-sm">Forgot password?</button>
          </form>
          <div className="mt-5 text-gray-400">
            Don’t have an account?{' '}
            <Link to="/registration" className="text-blue-400">
              {" "}SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
