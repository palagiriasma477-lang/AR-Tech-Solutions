export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        {/* Left Column */}
        <div className="hero-content">
          <div className="hero-badge">
            ⚡ Trusted by Engineering Students &amp; Enterprise Clients
          </div>

          <h1>
            Build Smarter.<br />
            <span>Launch Better.</span>
          </h1>

          <p>
            Professional Software, Web, Mobile &amp; Academic Engineering Project Solutions —
            100% customized for college students, startups, and expanding businesses across Kadapa, Rayachoti, and worldwide.
          </p>

          <div className="hero-btns">
            <a href="#enquiry" className="btn btn-primary">
              🚀 Get a Project Quote
            </a>
            <a href="#services" className="btn btn-outline-dark">
              Explore Our Services
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <h3>100%</h3>
              <p>Custom Code Guarantee</p>
            </div>
            <div className="hero-stat">
              <h3>Direct</h3>
              <p>Admin Consultation</p>
            </div>
            <div className="hero-stat">
              <h3>End-to-End</h3>
              <p>Documentation & Support</p>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Interactive Stack */}
        <div className="hero-visual">
          <div className="hero-card-stack">
            <div className="hero-card hero-card-behind">
              <div className="hero-card-title">Technology Portfolio</div>
              <div className="hero-card-value">React &bull; Node &bull; Python</div>
              <div className="hero-card-sub">Full-Stack Cloud Systems</div>
            </div>
            
            <div className="hero-card hero-card-main">
              <div className="hero-card-title">Real-Time Enquiry Pipeline</div>
              <div className="hero-card-value">⚡ Instant Admin Dispatch</div>
              <div className="hero-card-sub">SMS &bull; WhatsApp &bull; Gmail Sync</div>
              <div className="hero-pill">
                🔒 Permanent SQLite Storage Active
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
