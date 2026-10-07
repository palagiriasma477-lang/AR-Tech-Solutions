import { useState } from 'react'

const PROJECT_TYPES = [
  { id: 'academic-cse', label: '🎓 B.Tech / Diploma CSE', baseDays: '3–5 Days', defaultTech: 'React / Node.js / Express' },
  { id: 'academic-ece', label: '⚡ B.Tech / Diploma ECE', baseDays: '4–6 Days', defaultTech: 'Embedded C / Arduino / IoT' },
  { id: 'academic-mca', label: '🧑‍💻 MCA Major Software', baseDays: '5–7 Days', defaultTech: 'MERN Stack / Python' },
  { id: 'business-web', label: '🌐 Corporate Web Portal', baseDays: '3–6 Days', defaultTech: 'React / Next.js / Tailwind' },
  { id: 'business-app', label: '📱 Mobile Application', baseDays: '7–10 Days', defaultTech: 'Flutter / React Native' },
]

const SCOPE_TIERS = [
  { id: 'mini', label: 'Mini Project Scope', desc: 'Core modules, standard layout, essential data flow' },
  { id: 'standard', label: 'Standard Full-Stack', desc: 'Auth, database, responsive dashboards & full documentation' },
  { id: 'major', label: 'Major / Advanced System', desc: 'AI/ML algorithms, cloud deployment, IEEE report & PPT' },
]

export default function ProjectEstimator() {
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0])
  const [selectedScope, setSelectedScope] = useState(SCOPE_TIERS[1])
  const [needReport, setNeedReport] = useState(true)
  const [needDeployment, setNeedDeployment] = useState(true)

  function handleQuickEnquire() {
    const el = document.getElementById('enquiry')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="section-alt" id="estimator">
      <div className="container">
        <div className="text-center">
          <span className="section-badge">
            ⚡ Interactive Scope Configurator
          </span>
          <h2 className="section-title">Configure &amp; Estimate Your Project</h2>
          <p className="section-sub">
            Customize your requirements interactively to visualize the timeline, recommended stack,
            and complete deliverables before submitting your enquiry.
          </p>
        </div>

        <div className="estimator-card">
          <div className="estimator-grid">
            
            {/* Left Controls */}
            <div className="estimator-controls">
              
              {/* Step 1: Project Domain */}
              <div className="estimator-group">
                <label className="estimator-label">1. Select Project Category</label>
                <div className="estimator-pills">
                  {PROJECT_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className={`estimator-pill ${selectedType.id === t.id ? 'active' : ''}`}
                      onClick={() => setSelectedType(t)}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Scope Tier */}
              <div className="estimator-group">
                <label className="estimator-label">2. Project Scope &amp; Complexity</label>
                <div className="estimator-cards-sub">
                  {SCOPE_TIERS.map((s) => (
                    <div
                      key={s.id}
                      className={`estimator-subcard ${selectedScope.id === s.id ? 'active' : ''}`}
                      onClick={() => setSelectedScope(s)}
                    >
                      <div className="subcard-header">
                        <strong>{s.label}</strong>
                        {selectedScope.id === s.id && <span className="subcard-check">✓</span>}
                      </div>
                      <p>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Add-on Checkboxes */}
              <div className="estimator-group">
                <label className="estimator-label">3. Deliverable Inclusions</label>
                <div className="estimator-checkboxes">
                  <label className="estimator-check-label">
                    <input
                      type="checkbox"
                      checked={needReport}
                      onChange={(e) => setNeedReport(e.target.checked)}
                    />
                    <span>Complete IEEE Report, PPT Slides &amp; Viva Guide</span>
                  </label>
                  <label className="estimator-check-label">
                    <input
                      type="checkbox"
                      checked={needDeployment}
                      onChange={(e) => setNeedDeployment(e.target.checked)}
                    />
                    <span>Cloud Hosting / Live Deployment URL</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Right Interactive Preview Display */}
            <div className="estimator-summary-panel">
              <div className="summary-badge">🚀 Live Estimate Blueprint</div>
              
              <h3 className="summary-title">{selectedType.label}</h3>
              <p className="summary-scope-badge">{selectedScope.label}</p>

              <div className="summary-metric-row">
                <div className="summary-metric">
                  <span className="metric-label">Estimated Delivery</span>
                  <strong className="metric-val">{selectedType.baseDays}</strong>
                </div>
                <div className="summary-metric">
                  <span className="metric-label">Recommended Stack</span>
                  <strong className="metric-val" style={{ fontSize: '0.9rem' }}>{selectedType.defaultTech}</strong>
                </div>
              </div>

              <div className="summary-checklist">
                <h4>Included in Delivery Package:</h4>
                <ul>
                  <li><span className="check-dot">●</span> 100% Full Unlocked Source Code</li>
                  <li><span className="check-dot">●</span> Step-by-Step Local Setup &amp; Execution Support</li>
                  {needReport && <li><span className="check-dot">●</span> Formal Project Documentation &amp; Presentation PPT</li>}
                  {needDeployment && <li><span className="check-dot">●</span> Live Online Deployment URL</li>}
                  <li><span className="check-dot">●</span> Free Minor Post-Delivery Code Modifications</li>
                </ul>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '20px' }}
                onClick={handleQuickEnquire}
              >
                📝 Submit Enquiry for this Configuration &rarr;
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#94a3b8', margin: '12px 0 0' }}>
                💡 Fast response: Our lead engineers review and reply within hours.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
