import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../services/authService';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('job_seeker');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setLoading(true);

        const name = `${firstName} ${lastName}`;

        try {
            const result = await signup(name, email, password, role);
            console.log('Signup successful:', result.message);
            alert('Signup successful!');
            navigate('/login');
        } catch (err) {
            setErrorMessage(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <form
                className="w-full max-w-sm p-8 bg-gray-800 text-white rounded-lg shadow-lg"
                onSubmit={handleSignup}
            >
                <h2 className="text-lg text-gray-300 mb-6">Create an account</h2>
                <p className="text-gray-400 mb-6">
                    Already have an account?
                    <Link to="/SignIn" className="text-blue-400"> Login</Link>
                </p>
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="First name"
                        className="w-1/2 p-2 bg-gray-700 text-white rounded focus:outline-none"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Last name"
                        className="w-1/2 p-2 bg-gray-700 text-white rounded focus:outline-none"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-2 bg-gray-700 text-white rounded focus:outline-none"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full p-2 mb-4 bg-gray-700 text-white rounded focus:outline-none"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="6"
                />
                <select
                    className="w-full p-2 mb-4 bg-gray-700 text-white rounded focus:outline-none"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="job_seeker">Job Seeker</option>
                    <option value="recruiter">Recruiter</option>
                </select>
                <div className="flex items-center mb-4 text-gray-400">
                    <input type="checkbox" id="agree" className="mr-2" required />
                    <label htmlFor="agree">
                        I agree to the <a href="#" className="text-blue-400">Terms & Conditions</a>
                    </label>
                </div>
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                <button
                    type="submit"
                    className={`w-full p-3 ${loading ? "bg-gray-600" : "bg-purple-600"} text-white rounded mb-4 hover:bg-purple-500`}
                    disabled={loading}
                >
                    {loading ? "Creating account..." : "Create account"}
                </button>
            </form>
        </div>
    );
};

export default SignUp;
