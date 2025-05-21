import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  UserCheck, 
  Target, 
  BookOpen, 
  Code, 
  Award,
  CheckCircle
} from 'lucide-react';

const RecruitAILandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleJobSeekerClick = () => {
    navigate('/jobseeker/dashboard');
  };

  const handleRecruiterClick = () => {
    navigate('/recruiter/dashboard');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const features = [
    {
      icon: <UserCheck className="w-12 h-12 text-indigo-600" />,
      title: "For Job Seekers",
      description: "Take logical and skill tests to showcase your abilities and receive personalized job recommendations."
    },
    {
      icon: <Target className="w-12 h-12 text-indigo-600" />,
      title: "For Recruiters",
      description: "Find top talent through AI-powered candidate recommendations based on comprehensive skill assessments."
    },
    {
      icon: <BookOpen className="w-12 h-12 text-indigo-600" />,
      title: "Skill Assessments",
      description: "Comprehensive tests across multiple technologies like React, Node.js, Flutter, and more."
    }
  ];

  const technologies = [
    { name: 'React', icon: <Code className="w-5 h-5 mr-2" /> },
    { name: 'Node.js', icon: <Code className="w-5 h-5 mr-2" /> },
    { name: 'Flutter', icon: <Code className="w-5 h-5 mr-2" /> },
    { name: 'JavaScript', icon: <Code className="w-5 h-5 mr-2" /> },
    { name: 'Python', icon: <Code className="w-5 h-5 mr-2" /> },
    { name: 'Machine Learning', icon: <Code className="w-5 h-5 mr-2" /> }
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white min-h-screen">
      {/* Navigation */}
      <nav className="px-6 py-4 bg-white shadow-md fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.png" alt="Recruit AI Logo" className="w-auto h-10 mr-2" />
            <span className="text-2xl font-bold text-indigo-800">Recruit AI</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#features" className="text-gray-700 hover:text-indigo-600 transition">Features</a>
            <a href="#technologies" className="text-gray-700 hover:text-indigo-600 transition">Technologies</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600 transition">How It Works</a>
            <button 
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
              onClick={handleRegister}
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white absolute left-0 right-0 top-full shadow-lg">
            <div className="flex flex-col items-center py-4 space-y-4">
              <a href="#features" className="text-gray-700 hover:text-indigo-600">Features</a>
              <a href="#technologies" className="text-gray-700 hover:text-indigo-600">Technologies</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-indigo-600">How It Works</a>
              <button 
                className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 shadow-md"
                onClick={handleRegister}
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="pt-28 pb-20 px-6 container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Recruit AI Logo" className="h-20" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-indigo-900 mb-6">
            Streamline Your Recruitment Process with AI
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Recruit AI revolutionizes hiring by connecting top talent with the right opportunities through intelligent skill assessments and recommendations.
          </p>
          <div className="flex flex-col md:flex-row justify-center md:space-x-6 space-y-4 md:space-y-0">
            <button 
              className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              onClick={handleJobSeekerClick}
            >
              For Job Seekers
            </button>
            <button 
              className="bg-amber-500 text-white px-6 py-3 rounded-full hover:bg-amber-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              onClick={handleRecruiterClick}
            >
              For Recruiters
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 bg-indigo-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-12">
            How Recruit AI Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center transform hover:-translate-y-2 duration-300"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-indigo-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technologies" className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-8">
            Technologies We Cover
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <div 
                key={index} 
                className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full hover:bg-indigo-200 transition flex items-center shadow-sm hover:shadow-md"
              >
                {tech.icon}
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-6 bg-gradient-to-br from-indigo-100 to-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-12">
            The Recruit AI Experience
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 rounded-full p-4 mb-4">
                <UserCheck className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">Create Profile</h3>
              <p className="text-gray-600">Build your comprehensive profile showcasing your skills and experience</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 rounded-full p-4 mb-4">
                <CheckCircle className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">Take Assessments</h3>
              <p className="text-gray-600">Complete skill-based assessments to verify your technical abilities</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-indigo-100 rounded-full p-4 mb-4">
                <Award className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">Get Matched</h3>
              <p className="text-gray-600">Our AI connects you with perfect job matches based on your verified skills</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 text-white py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Recruitment Process?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join Recruit AI and experience smarter, more efficient hiring and job seeking.
          </p>
          <div className="flex flex-col md:flex-row justify-center md:space-x-6 space-y-4 md:space-y-0">
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-full hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Sign Up Now
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-indigo-600 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-12">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-indigo-50 p-6 rounded-xl shadow-md">
              <p className="text-gray-700 italic mb-4">
                "Recruit AI helped me find my dream job in just two weeks. The skill assessments really helped me stand out to employers."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold mr-3">
                  JS
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-800">Jane Smith</h4>
                  <p className="text-gray-600 text-sm">Frontend Developer</p>
                </div>
              </div>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl shadow-md">
              <p className="text-gray-700 italic mb-4">
                "As a tech recruiter, Recruit AI has cut our hiring time in half. The skill validation is a game-changer for our team."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold mr-3">
                  MT
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-800">Mark Taylor</h4>
                  <p className="text-gray-600 text-sm">HR Director, TechCorp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-8 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <img src="/logo.svg" alt="Recruit AI Logo" className="w-8 h-8 mr-2 bg-white rounded-full p-1" />
            <span className="text-xl font-bold">Recruit AI</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-indigo-300 transition">About</a>
            <a href="#" className="hover:text-indigo-300 transition">Features</a>
            <a href="#" className="hover:text-indigo-300 transition">Contact</a>
            <a href="#" className="hover:text-indigo-300 transition">Privacy Policy</a>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-indigo-200">
            © 2024 Recruit AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RecruitAILandingPage;