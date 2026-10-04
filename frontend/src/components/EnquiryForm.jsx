import { useState } from 'react'

const INITIAL = {
  name: '',
  phone: '',
  whatsapp: '',
  email: '',
  service: '',
  package: '',
  pages: '',
  features: '',
  technology: '',
  project_type: '',
  due_date: '',
  budget: '',
  requirements: '',
}

const serviceOptions = [
  'Website Development',
  'Web Applications',
  'Mobile Applications (Android / iOS)',
  'Custom Software Development',
  'AI / ML Academic Projects',
  'Cloud Architecture & Solutions',
  'IT Consulting & Advisory',
  'Digital Marketing & SEO',
  'Maintenance, Support & Bug Fixes',
  'Diploma Mini Project (ECE / CSE)',
  'B.Tech ECE Mini / Major Project',
  'B.Tech CSE Mini / Major Project',
  'MCA Final Year Project',
  'Project Customization & Code Upgrade',
  'Other / Custom Requirement',
]

const packageOptions = ['Basic Package', 'Standard Package (Recommended)', 'Premium Package', 'Not Decided Yet']
const pagesOptions = ['Single Page Landing', '2–3 Pages', '4–6 Pages', '7–10 Pages', '10+ Pages Enterprise', 'Not Applicable']
const techOptions = [
  'React / Node.js / Express',
  'Python / Django / FastAPI',
  'AI / ML / Data Science (Python)',
  'Java / Spring Boot',
  'Flutter / React Native',
  'Embedded C / Arduino / IoT / ESP32',
  'PHP / MySQL / WordPress',
  'Not Sure — Please Recommend Stack',
]
const projectTypeOptions = [
  'Student / Academic Project',
  'Corporate Business Website / App',
  'Startup MVP Product',
  'Personal Portfolio / Brand',
  'Software Automation Tool',
  'Other',
]
const budgetOptions = [
  '₹2,000 – ₹5,000 (Student Mini Project)',
  '₹5,000 – ₹10,000 (Standard Student / Business)',
  '₹10,000 – ₹20,000 (Major / Full-Stack Project)',
  '₹20,000+ (Advanced / Enterprise Software)',
  'Flexible / Discuss with Team',
]

export default function EnquiryForm() {
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [successData, setSuccessData] = useState(null)
  const [serverError, setServerError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }))
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your full name.'
    if (!form.phone.trim()) e.phone = 'Please enter your phone number.'
    if (!form.email.trim()) {
      e.email = 'Please enter your email address.'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      e.email = 'Please enter a valid email address.'
    }
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setServerError('')
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setLoading(true)
    try {
      // Uses Vite proxy /api/enquiries which seamlessly routes to backend port 5000
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setServerError(data.message || 'Failed to submit enquiry. Please try again.')
        return
      }

      setSuccessData({
        enquiryId: data.enquiryId,
        waLinks: data.waLinks,
        clientName: form.name,
        service: form.service,
      })
      setForm(INITIAL)
    } catch {
      setServerError('Unable to connect to AR Tech Solutions backend server. Please verify backend is running on port 5000.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="enquiry-section" id="enquiry">
      <div className="container">
        <div className="enquiry-wrapper">
          
          {/* Left Information Column */}
          <div className="enquiry-info">
            <span className="section-badge-dark">
              ⚡ FAST CONSULTATION &amp; QUOTE
            </span>
            <h2>Have a Project in Mind? Let&apos;s Build It Together.</h2>
            <p>
              Submit your requirements below. Every project is reviewed by our technical leads,
              stored securely in our database, and triggers an <strong>immediate urgent alert to our administrators</strong> for rapid follow-up.
            </p>

            <div className="contact-items">
              <div className="contact-item">
                <div className="contact-item-icon">⚡</div>
                <div>
                  <strong>Urgent Admin Alert</strong>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Both administrators are notified instantly upon submission</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">💬</div>
                <div>
                  <strong>WhatsApp &amp; Phone Consultation</strong>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Direct discussion on requirements, scope, and timeline</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">🎓</div>
                <div>
                  <strong>100% Customized Academic Delivery</strong>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Complete source code, documentation, PPT &amp; viva guidance</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon">📍</div>
                <div>
                  <strong>Local Hubs in Kadapa &amp; Rayachoti</strong>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Serving students and businesses across Andhra Pradesh &amp; online</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="enquiry-form-card">
            {successData ? (
              <div className="form-success-card">
                <div className="success-icon-badge">✅</div>
                <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '8px' }}>
                  Enquiry Submitted Successfully!
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.94rem', margin: 0 }}>
                  Thank you, <strong>{successData.clientName}</strong>. Your enquiry has been permanently saved to our database.
                </p>

                <div className="success-id-pill">
                  Reference ID: #{successData.enquiryId}
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', margin: '20px 0', textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: '0.92rem', color: '#334155', lineHeight: 1.6 }}>
                    Your requirements have been securely logged and dispatched to our administration team.
                    We will review your scope and get in touch with you shortly.
                  </p>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '8px' }}
                  onClick={() => setSuccessData(null)}
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.28rem', color: '#0f172a', marginBottom: '6px' }}>
                    Project Enquiry Form
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#64748b', margin: 0 }}>
                    Please fill out the details below. Required fields are marked with <span style={{ color: '#ef4444' }}>*</span>
                  </p>
                </div>

                {serverError && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.88rem' }}>
                    ⚠️ {serverError}
                  </div>
                )}

                {/* Row 1: Name & Phone */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name <span className="req">*</span></label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. Rahul Sharma"
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label>Mobile Number <span className="req">*</span></label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="10-digit mobile number"
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>
                </div>

                {/* Row 2: WhatsApp & Email */}
                <div className="form-row">
                  <div className="form-group">
                    <label>WhatsApp Number</label>
                    <input
                      name="whatsapp"
                      value={form.whatsapp}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="If different from mobile"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address <span className="req">*</span></label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="name@example.com"
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>
                </div>

                {/* Row 3: Service & Package */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Service Category</label>
                    <select name="service" value={form.service} onChange={handleChange} className="form-control">
                      <option value="">Select Service Required</option>
                      {serviceOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Package Tier</label>
                    <select name="package" value={form.package} onChange={handleChange} className="form-control">
                      <option value="">Select Preferred Package</option>
                      {packageOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4: Pages & Tech Stack */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Number of Pages / Screens</label>
                    <select name="pages" value={form.pages} onChange={handleChange} className="form-control">
                      <option value="">Select Scope / Page Count</option>
                      {pagesOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Preferred Technology</label>
                    <select name="technology" value={form.technology} onChange={handleChange} className="form-control">
                      <option value="">Select Tech Preference</option>
                      {techOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 5: Project Type & Due Date */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Project Type</label>
                    <select name="project_type" value={form.project_type} onChange={handleChange} className="form-control">
                      <option value="">Select Project Type</option>
                      {projectTypeOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Required Submission / Due Date</label>
                    <input
                      name="due_date"
                      type="date"
                      value={form.due_date}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Row 6: Budget & Features */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Estimated Budget (Optional)</label>
                    <select name="budget" value={form.budget} onChange={handleChange} className="form-control">
                      <option value="">Select Estimated Range</option>
                      {budgetOptions.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Core Features Needed</label>
                    <input
                      name="features"
                      value={form.features}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="e.g. Auth, Admin, Razorpay, Sensors"
                    />
                  </div>
                </div>

                {/* Row 7: Additional Requirements Text */}
                <div className="form-group">
                  <label>Detailed Project Requirements / Syllabus Notes</label>
                  <textarea
                    name="requirements"
                    value={form.requirements}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Describe your project concept, guidelines, college guidelines, or specific customizations..."
                  />
                </div>

                <button type="submit" className="form-submit" disabled={loading}>
                  {loading ? '⏳ Submitting Enquiry...' : '🚀 Submit Enquiry'}
                </button>

                <p style={{ fontSize: '0.78rem', color: '#94a3b8', textAlign: 'center', marginTop: '14px', margin: 0 }}>
                  🔒 Your contact information is kept strictly confidential and only used to respond to your request.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
