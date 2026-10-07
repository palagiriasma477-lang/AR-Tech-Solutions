const packages = [
  {
    name: 'Basic Package',
    tag: 'Ideal for streamlined academic assignments & landing pages',
    features: [
      'Single-page or focused 2–3 screen interface',
      'Clean modern responsive layout',
      'Mobile & desktop optimized',
      'Essential form / input interactions',
      'Full source code delivery',
      'Execution setup & basic documentation',
    ],
    popular: false,
  },
  {
    name: 'Standard Package',
    tag: 'Most popular for B.Tech / Diploma Major projects & business web apps',
    features: [
      'Multi-page application / customized design',
      'Frontend + Backend + Database integration',
      'User authentication & protected sessions',
      'Admin control panel & data management',
      'REST API integrations & data validation',
      'Full documentation, PPT & viva question guide',
      'End-to-end deployment assistance',
    ],
    popular: true,
  },
  {
    name: 'Premium Package',
    tag: 'Advanced AI/ML systems, cloud architectures & enterprise software',
    features: [
      'Complex full-stack system architecture',
      'AI / ML model integration or IoT connectivity',
      'Cloud hosting & live deployment (Vercel / Railway / AWS)',
      'Multi-role access (Admin, User, Client)',
      'Automated notifications (SMS / WhatsApp / Email)',
      'High performance tuning & security audit',
      'Priority ongoing maintenance & technical support',
    ],
    popular: false,
  },
]

export default function Packages() {
  return (
    <section className="section-alt" id="packages">
      <div className="container">
        <div className="text-center">
          <span className="section-badge">Transparent Value</span>
          <h2 className="section-title">Tailored Project Packages</h2>
          <p className="section-sub">
            No rigid fixed pricing. Every quote is estimated fairly based on your syllabus guidelines,
            complexity, feature list, and target completion date.
          </p>
        </div>

        <div className="packages-grid">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`package-card ${pkg.popular ? 'popular' : ''}`}
            >
              {pkg.popular && (
                <div className="popular-badge">⭐ MOST POPULAR</div>
              )}

              <div className="package-name">{pkg.name}</div>
              <div className="package-tag">{pkg.tag}</div>

              <div className="package-price-tag" style={{ margin: '14px 0 16px', padding: '10px 14px', background: pkg.popular ? 'rgba(37,99,235,0.08)' : '#f8fafc', borderRadius: '8px', border: pkg.popular ? '1px solid rgba(37,99,235,0.2)' : '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b', display: 'block' }}>Estimated Turnaround</span>
                <strong style={{ fontSize: '1.1rem', color: pkg.popular ? '#2563eb' : '#0f172a' }}>
                  {pkg.name === 'Basic Package' ? '⚡ 2–4 Days • Starting at ₹2,499' : pkg.name === 'Standard Package' ? '⚡ 3–5 Days • High Value Choice' : '⚡ 5–7 Days • Full Architecture'}
                </strong>
              </div>

              <ul className="package-features">
                {pkg.features.map((f) => (
                  <li key={f}>
                    <span className="pkg-check">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
                <a
                  href="#enquiry"
                  className={`btn ${pkg.popular ? 'btn-primary' : 'btn-outline-blue'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    const sel = document.querySelector('select[name="package"]')
                    if (sel) sel.value = pkg.name
                  }}
                >
                  🚀 Choose {pkg.name} &rarr;
                </a>
                <a
                  href={`https://api.whatsapp.com/send?phone=919390011965&text=${encodeURIComponent(`Hello AR Tech Solutions, I want to book the ${pkg.name}. Please share the project quote and timeline.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wa-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    fontSize: '0.84rem',
                    color: '#15803d',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  💬 Quick Book via WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center" style={{ marginTop: 36, fontSize: '0.94rem', color: '#64748b' }}>
          Need something completely unique? <a href="#enquiry" style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>Tell us your custom scope</a> and our engineers will guide you.
        </p>
      </div>
    </section>
  )
}
