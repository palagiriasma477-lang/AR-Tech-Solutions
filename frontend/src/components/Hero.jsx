export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        {/* Left Column */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-pulse"></span>
            ⚡ Enterprise Software Engineering &amp; Commercial Digital Solutions
          </div>

          <h1>
            Full-Stack Digital Products &amp;<br />
            <span className="text-gradient">High-Reliability Software Systems.</span>
          </h1>

          <p>
            From venture-backed startups and commercial enterprises to academic engineering breakthroughs:
            we design, build, and deploy high-performance web platforms, mobile apps, AI/ML models, and bespoke cloud architectures with guaranteed execution.
          </p>

          <div className="hero-btns">
            <a href="#packages" className="btn btn-primary pulse-btn">
              ⭐ Explore Solutions &amp; Packages
            </a>
            <a href="#estimator" className="btn btn-outline-dark">
              ⚡ Live Project Scope Calculator
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <h3>99.9%</h3>
              <p>Production Uptime &amp; SLA</p>
            </div>
            <div className="hero-stat">
              <h3>100%</h3>
              <p>Source Code Ownership</p>
            </div>
            <div className="hero-stat">
              <h3>48–72h</h3>
              <p>Rapid MVP &amp; Sprint Delivery</p>
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
