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

              <div className="package-price-note">
                💡 <strong>Final Pricing Depends On:</strong><br />
                Number of modules &bull; Technology choice &bull; Hardware/IoT &bull; Delivery deadline &bull; Custom features
              </div>

              <ul className="package-features">
                {pkg.features.map((f) => (
                  <li key={f}>
                    <span className="pkg-check">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#enquiry"
                className={`btn ${pkg.popular ? 'btn-primary' : 'btn-outline-blue'}`}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {pkg.popular ? 'Get Final Price Quote' : 'Request a Quote'}
              </a>
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
