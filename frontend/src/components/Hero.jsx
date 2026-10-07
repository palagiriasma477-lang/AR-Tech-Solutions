export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        {/* Left Column */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            ⚡ Fast-Track Academic &amp; Enterprise Project Solutions
          </div>

          <h1>
            Turn Your Ideas Into<br />
            <span className="text-gradient">High-Impact Software.</span>
          </h1>

          <p>
            Get industry-grade Web &amp; Mobile Applications, AI/ML Systems, and Academic Engineering Projects
            built directly to your syllabus or business workflow. 100% running code, comprehensive documentation,
            and personal viva guidance guaranteed.
          </p>

          <div className="hero-btns">
            <a href="#packages" className="btn btn-primary pulse-btn">
              ⭐ Choose a Package &amp; Get Quote
            </a>
            <a href="#estimator" className="btn btn-outline-dark">
              ⚡ Configure Your Project (Live)
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <h3>48–72h</h3>
              <p>Express Project Delivery</p>
            </div>
            <div className="hero-stat">
              <h3>100%</h3>
              <p>Working Code &amp; Viva Ready</p>
            </div>
            <div className="hero-stat">
              <h3>1-on-1</h3>
              <p>Direct Screen Share Setup</p>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Interactive Stack Inspired by Modern Agency Reels */}
        <div className="hero-visual">
          <div className="hero-card-stack">
            <div className="hero-card hero-card-behind">
              <div className="hero-card-badge">🏆 TOP RATED</div>
              <div className="hero-card-title">Full Engineering Deliverable</div>
              <div className="hero-card-value">100% Source Code + PPT</div>
              <div className="hero-card-sub">Complete IEEE Standard Report &amp; Diagrams</div>
            </div>
            
            <div className="hero-card hero-card-main">
              <div className="hero-card-header">
                <span className="live-dot"></span>
                <span className="live-text">Direct Engineering Support Online</span>
              </div>
              <div className="hero-card-title">Project Readiness Blueprint</div>
              <div className="hero-card-value">⚡ Zero Error Execution</div>
              <div className="hero-card-sub">Tested on Your Laptop &bull; Full Viva Preparation</div>
              <div className="hero-pill-feature">
                <span>🛡️ Complete Guidance Until Final Exam Submission</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
