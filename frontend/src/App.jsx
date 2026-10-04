import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Academic from './components/Academic'
import CustomBanner from './components/CustomBanner'
import WhyUs from './components/WhyUs'
import Packages from './components/Packages'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import EnquiryForm from './components/EnquiryForm'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'

/* ── Public Website ─────────────────────────────── */
function PublicSite() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <Hero />
      <Services />
      <Academic />
      <CustomBanner />
      <WhyUs />
      <Packages />
      <Process />
      <Portfolio />
      <EnquiryForm />
      <Contact />
      <Footer />

      {/* Floating CTA */}
      <a href="#enquiry" className="floating-cta">
        🚀 <span>Get a Quote</span>
      </a>
    </div>
  )
}

/* ── Root App with Router ───────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
