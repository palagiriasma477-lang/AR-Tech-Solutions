import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MarqueeTicker from './components/MarqueeTicker'
import Services from './components/Services'
import EngineeringLabAnimation from './components/EngineeringLabAnimation'
import Academic from './components/Academic'
import ProjectEstimator from './components/ProjectEstimator'
import CustomBanner from './components/CustomBanner'
import TrustStrip from './components/TrustStrip'
import Packages from './components/Packages'
import Process from './components/Process'
import Portfolio from './components/Portfolio'
import WhyUs from './components/WhyUs'
import EnquiryForm from './components/EnquiryForm'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'

/* ── Public Website ─────────────────────────────── */
function PublicSite() {
  // Real-time visitor analytics tracking
  useEffect(() => {
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: window.location.pathname, referrer: document.referrer || '' }),
    }).catch(() => {})
  }, [])

  return (
    <div className="page-wrapper">
      <Navbar />
      <Hero />
      <MarqueeTicker />
      <Services />
      <EngineeringLabAnimation />
      <Academic />
      <ProjectEstimator />
      <CustomBanner />
      <TrustStrip />
      <Packages />
      <Process />
      <Portfolio />
      <WhyUs />
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
