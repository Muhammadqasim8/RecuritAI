import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import Button from './Components/Button';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Hero from './Components/Hero';
import FAQ from './Components/FAQ';
import Testimonial from './Components/Testimonial';
import CTA26 from './Components/CTA26';
import Features24 from './Components/Features24';
import Steps from './Components/Steps';
import ContactUs from './Components/ContactUs';
import SignIn from './Components/auth/SignIn';
import SignUp from './Components/auth/SignUp';
import JoinRecruitAI from './Components/JoinRecruitAI';
import RecruiterOptions from './Components/RecruiterOptions';
import JobSeekerOptions from './Components/JobSeekerOptions';
import UploadForm from './Components/UploadForm'; // New Component
import RecruiterCompleteProfile from './Components/auth/RecruiterCompleteProfile'; // New Component
import JobSeekerCompleteProfile from './Components/auth/JobSeekerCompleteProfile'; // New Component

// Layout component wraps pages with common Header and Footer
const Layout = () => (
  <div>
    <Header />
    <Outlet /> {/* Renders nested routes */}
    <Footer />
  </div>
);

// Login component that navigates to JoinRecruitAI after successful login
const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // Navigate to the JoinRecruitAI screen after successful login
    navigate('/join-recruitai');
  };

  return <SignIn onLoginSuccess={handleLoginSuccess} />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Layout */}
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <>
                <Hero />
                <Features24 />
                <CTA26 />
                <Steps />
                <Testimonial />
                <FAQ />
                <ContactUs />
              </>
            }
          />
        </Route>

        {/* Login Screen */}
        <Route path="/login" element={<Layout />}>
          <Route index element={<Login />} />
        </Route>

        {/* Registration */}
        <Route path="/registration/*" element={<SignUp />} />

        {/* Join RecruitAI */}
        <Route path="/join-recruitai" element={<Layout />}>
          <Route index element={<JoinRecruitAI />} />
        </Route>

        {/* Recruiter Options */}
        <Route path="/recruiter-options" element={<Layout />}>
          <Route index element={<RecruiterOptions />} />
        </Route>

        {/* Job Seeker Options */}
        <Route path="/job-seeker-options" element={<Layout />}>
          <Route index element={<JobSeekerOptions />} />
        </Route>

        {/* Get Matched Resumes */}
        <Route path="/get-matched-resumes" element={<Layout />}>
          <Route index element={<UploadForm />} />
        </Route>

        {/* Recruiter Complete Profile */}
        <Route path="/complete-profile/recruiter" element={<Layout />}>
          <Route index element={<RecruiterCompleteProfile />} />
        </Route>

        {/* Job Seeker Complete Profile */}
        <Route path="/complete-profile/job-seeker" element={<Layout />}>
          <Route index element={<JobSeekerCompleteProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
