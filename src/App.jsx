import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Hero from './Components/Hero';
import FAQ from './Components/FAQ';
import Testimonial from './Components/Testimonial';
import CTA26 from './Components/CTA26';
import Features24 from './Components/Features24';
import Steps from './Components/Steps';
import ContactUs from './Components/ContactUs';
import Login from './Components/Login';
import Registration from './Components/Registration'; // Import the Registration component

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet /> {/* Outlet will render routed components */}
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Main route (/) renders the usual components */}
          <Route index element={
            <>
              <Hero />
              <Features24 />
              <CTA26 />
              <Steps />
              <Testimonial />
              <FAQ />
              <ContactUs />
            </>
          } />
        </Route>
        {/* Separate route for the login page */}
        <Route path="/login" element={<Layout />}>
          <Route index element={<Login />} />
        </Route>
        {/* Separate route for the registration page */}
        <Route path="/registration" element={<Layout />}>
          <Route index element={<Registration />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
