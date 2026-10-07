import { useState } from 'react'

const packagesData = {
  academic: [
    {
      id: 'acad-mini',
      name: 'Academic Mini Project',
      badge: 'Fast Track (2–3 Days)',
      badgeColor: 'blue',
      tag: 'Ideal for Diploma & B.Tech 3rd/4th Sem Mini Projects & Assignments',
      priceDisplay: 'Starting at ₹1,999',
      features: [
        'Complete 100% Working Source Code',
        'Direct Screen-Share Setup & Execution on Your Laptop',
        'Clean Standard Project Report (IEEE Format)',
        'Viva Preparation Questions & Answers Guide',
        'PowerPoint Presentation (.PPT) Ready for Review',
        'Bug-Free Execution Guarantee',
      ],
      popular: false,
    },
    {
      id: 'acad-major',
      name: 'Major B.Tech / MCA Project',
      badge: '⭐ MOST POPULAR FOR STUDENTS',
      badgeColor: 'gold',
      tag: 'Full-Stack Web, AI/ML, Computer Vision, or Cloud Major Projects',
      priceDisplay: 'High Value • Complete Guidance',
      features: [
        'Complete Frontend + Backend + Database Architecture',
        'Custom IEEE Standard Base Paper Implementation',
        'High-Accuracy ML Model / Neural Network Training',
        '40–60 Page Comprehensive Project Documentation Report',
        'Professional Viva PPT (35+ Slides) with Architecture Diagrams',
        '1-on-1 Viva Preparation Session with Senior Developer',
        'Full Support Until Final External Exam Review Submission',
      ],
      popular: true,
    },
    {
      id: 'acad-ece',
      name: 'ECE / IoT Hardware Project',
      badge: 'Hardware Telemetry + Code',
      badgeColor: 'cyan',
      tag: 'Embedded C, ESP32, Arduino, Raspberry Pi & Microcontroller Projects',
      priceDisplay: 'Hardware Architecture Ready',
      features: [
        'Tested Microcontroller Firmware Code & Circuit Schematics',
        'Sensor Telemetry & IoT Cloud Web Dashboard',
        'Comprehensive Component List & Wiring Pinout Diagrams',
        'Simulation Files (Proteus / Tinkercad where applicable)',
        'Complete IEEE Format ECE Project Report & Block Diagrams',
        'Step-by-Step Hardware Execution Video Guide',
      ],
      popular: false,
    },
  ],
  commercial: [
    {
      id: 'comm-launch',
      name: 'Startup Launch Website',
      badge: '⚡ 3–5 Days Turnaround',
      badgeColor: 'blue',
      tag: 'Modern, high-converting corporate presence with SEO excellence',
      priceDisplay: 'Affordable Commercial MVP',
      features: [
        'Custom Responsive Design (Vite / React / Next.js)',
        'Sub-Second Loading Speed & 99+ PageSpeed Score',
        'SEO-Optimized Metadata & Rich OpenGraph Previews',
        'Lead Capture Contact Forms with Instant WhatsApp Alerts',
        'Domain & Cloud Hosting Deployment (Vercel / Railway / AWS)',
        'Free SSL Certificate & 30-Day Post-Launch Support',
      ],
      popular: false,
    },
    {
      id: 'comm-fullstack',
      name: 'Full-Stack Web Platform',
      badge: '🚀 BEST FOR BUSINESS SCALE',
      badgeColor: 'gold',
      tag: 'Custom SaaS, Portal, Admin Dashboards & Multi-Role Applications',
      priceDisplay: 'Full Enterprise Stack',
      features: [
        'React Frontend + Node.js / Python REST API',
        'PostgreSQL / MongoDB Secure Database Architecture',
        'Role-Based Authentication (Admin, Manager, Customer)',
        'Real-Time Analytics & Reporting Export (CSV/PDF)',
        'Automated Customer Notifications (WhatsApp & Email)',
        'Complete Source Code Ownership & Deployment Pipeline',
        '60-Day Priority Technical Support & Bug Fix Guarantee',
      ],
      popular: true,
    },
    {
      id: 'comm-custom',
      name: 'Enterprise Bespoke Software',
      badge: 'Custom Architecture',
      badgeColor: 'cyan',
      tag: 'Bespoke automation, billing software, inventory systems & mobile apps',
      priceDisplay: 'Tailored Scope Estimate',
      features: [
        'Cross-Platform Mobile App (Android & iOS) or Desktop App',
        'Complex Workflow Automation & Database Sharding',
        'Third-Party API & Payment Gateway Integrations',
        'End-to-End Containerization (Docker & Microservices)',
        'Dedicated SLA & 24/7 Security Vulnerability Monitoring',
        'NDA & Complete Intellectual Property (IP) Protection',
      ],
      popular: false,
    },
  ],
}

export default function Packages() {
  const [activeTab, setActiveTab] = useState('academic')
  const currentList = packagesData[activeTab]

  return (
    <section className="section-dark modern-packages-section" id="packages">
      <div className="container">
        <div className="text-center">
          <div className="section-badge-animated">
            <span className="badge-glow-dot"></span>
            <span>Transparent Engineering Value</span>
          </div>
          <h2 className="section-title-dark">Tailored Project Packages</h2>
          <p className="section-sub-dark">
            Zero hidden costs. Every quote is estimated transparently based on your syllabus or commercial scope,
            complexity, milestone dates, and post-delivery guidance requirements.
          </p>

          {/* Interactive Toggle between Academic & Commercial */}
          <div className="package-toggle-wrapper">
            <button
              type="button"
              className={`toggle-track-btn ${activeTab === 'academic' ? 'active' : ''}`}
              onClick={() => setActiveTab('academic')}
            >
              🎓 College / B.Tech Projects
            </button>
            <button
              type="button"
              className={`toggle-track-btn ${activeTab === 'commercial' ? 'active' : ''}`}
              onClick={() => setActiveTab('commercial')}
            >
              💼 Startups & Commercial Software
            </button>
          </div>
        </div>

        {/* Packages Cards Grid */}
        <div className="packages-grid modern-packages-grid">
          {currentList.map((pkg) => (
            <div
              key={pkg.id}
              className={`modern-pkg-card ${pkg.popular ? 'popular-card' : ''}`}
            >
              {pkg.popular && (
                <div className="pkg-glow-popular-badge">
                  {pkg.badge}
                </div>
              )}

              <div className="pkg-header">
                {!pkg.popular && (
                  <span className={`pkg-sub-badge badge-${pkg.badgeColor}`}>
                    {pkg.badge}
                  </span>
                )}
                <h3 className="pkg-name-title">{pkg.name}</h3>
                <p className="pkg-tagline-text">{pkg.tag}</p>
              </div>

              {/* Price / Turnaround Block */}
              <div className="pkg-price-banner">
                <span className="price-label">Estimated Investment</span>
                <div className="price-number">{pkg.priceDisplay}</div>
              </div>

              {/* Feature Checklist */}
              <ul className="pkg-features-list">
                {pkg.features.map((f, fIdx) => (
                  <li key={fIdx}>
                    <span className="feat-check-icon">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="pkg-action-buttons">
                <a
                  href="#enquiry"
                  className={`btn ${pkg.popular ? 'btn-primary' : 'btn-outline-cyan'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    const sel = document.querySelector('select[name="package"]')
                    if (sel) sel.value = pkg.name
                  }}
                >
                  🚀 Book {pkg.name} &rarr;
                </a>
                <a
                  href={`https://api.whatsapp.com/send?phone=919390011965&text=${encodeURIComponent(`Hello AR Tech Solutions, I want to book the ${pkg.name} (${activeTab.toUpperCase()}). Please share details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wa-pkg"
                >
                  💬 Instant WhatsApp Booking
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="packages-trust-banner">
          <div className="trust-banner-item">
            <span className="t-icon">🛡️</span>
            <div>
              <strong>100% Viva & Submission Support</strong>
              <p>We do not disappear after sending code. We guide you until final sign-off.</p>
            </div>
          </div>
          <div className="trust-banner-item">
            <span className="t-icon">⚡</span>
            <div>
              <strong>Direct Screen Share Testing</strong>
              <p>Our engineers test and verify the execution directly on your personal computer.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
