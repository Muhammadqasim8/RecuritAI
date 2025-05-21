// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import JobSeekerDashboard from './pages/jobseeker/Dashboard';
import AvailableTests from './pages/jobseeker/AvailableTests';
import TestPage from './pages/jobseeker/TestPage';
import RecruiterDashboard from './pages/recruiter/Dashboard';
import JobPostings from './pages/recruiter/UploadForm';
import Applicants from './pages/recruiter/Applicants';
import AdminDashboard from './pages/admin/Dashboard';
import ManageTests from './pages/admin/ManageTests';
import ManageUsers from './pages/admin/ManageUsers';
import PrivateRoute from './components/PrivateRoute';
import TestQuestions from './pages/admin/TestQuestions';
import RecommendedOnes from './pages/recruiter/RecommendedOnes'
import JobSeekerProfileForm from './pages/jobseeker/JobSeekerProfileForm';
import RecruiterProfileForm from './pages/recruiter/RecruiterProfileForm';
import CheckATS from './pages/jobseeker/CheckATS';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';



function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/jobseeker/complete-profile" element={<JobSeekerProfileForm />} />
        <Route path="/recruiter/complete-profile" element={<RecruiterProfileForm />} />

      {/* Job Seeker Routes */}
      <Route element={<PrivateRoute allowedRoles={['job_seeker']} />}>
        <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />
        <Route path="/jobseeker/check-ats" element={<CheckATS />} />
        <Route path="/jobseeker/tests" element={<AvailableTests />} />
        <Route path="/jobseeker/tests/:testId" element={<TestPage />} />
      </Route>

      {/* Recruiter Routes */}
      <Route element={<PrivateRoute allowedRoles={['recruiter']} />}>
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/get-matched-resumes" element={<JobPostings />} />
        <Route path="/recruiter/applicants" element={<Applicants />} />
        <Route path='/get-talented-candidates' element={RecommendedOnes} />
      </Route>

      {/* Admin Routes */}
      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/tests" element={<ManageTests />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/test/:testId/questions" element={<TestQuestions />} />

        {/* /admin/test/${test.id}/questions */}
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
