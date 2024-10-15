import React from 'react'
import Header from './Components/Header'
import FAQ from './Components/FAQ'
import Footer from './Components/Footer'
import Hero from './Components/Hero'
import Testimonial from './Components/Testimonial'
import CTA26 from './Components/CTA26'
import Features24 from './Components/Features24'
import Steps from './Components/Steps'
import ContactUs from './Components/ContactUs'

const App = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <Features24/>
      <CTA26/>
      <Steps/>
      <Testimonial/>
      <FAQ/>
      <ContactUs/>
      <Footer/>
    </div>
  )
}

export default App
