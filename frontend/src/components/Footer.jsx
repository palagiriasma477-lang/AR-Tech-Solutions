export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <div className="navbar-logo" style={{ color: '#fff' }}>
              <div className="logo-icon">AR</div>
              AR Tech <span>Solutions</span>
            </div>
            <p className="footer-brand-desc">
              Premier software development, mobile platforms, and customized engineering academic project solutions
              headquartered in Kadapa &amp; Rayachoti, Andhra Pradesh.
            </p>
            <div className="footer-socials">
              <a href="https://wa.me/919390011965" target="_blank" rel="noreferrer" className="footer-social" title="WhatsApp">💬</a>
              <a href="mailto:palagiriasma477@gmail.com" className="footer-social" title="Gmail">📧</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social" title="Instagram">📸</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-social" title="GitHub">💻</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social" title="LinkedIn">🔗</a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h5>Navigation</h5>
            <ul>
              <li><a href="#home">Home Overview</a></li>
              <li><a href="#services">IT Services</a></li>
              <li><a href="#academic">Student Projects</a></li>
              <li><a href="#packages">Pricing Packages</a></li>
              <li><a href="#portfolio">Featured Portfolio</a></li>
              <li><a href="#why">Why Choose Us</a></li>
              <li><a href="#contact">Contact &amp; Map</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="footer-col">
            <h5>Core Services</h5>
            <ul>
              <li><a href="#services">Website Development</a></li>
              <li><a href="#services">Web Applications</a></li>
              <li><a href="#services">Mobile Applications</a></li>
              <li><a href="#services">Software Engineering</a></li>
              <li><a href="#services">Cloud &amp; DevOps</a></li>
              <li><a href="#services">IT Strategy &amp; Consulting</a></li>
              <li><a href="#services">Maintenance &amp; Support</a></li>
            </ul>
          </div>

          {/* Academic Projects Column */}
          <div className="footer-col">
            <h5>Academic Hub</h5>
            <ul>
              <li><a href="#academic">Diploma ECE / CSE Projects</a></li>
              <li><a href="#academic">B.Tech ECE Mini &amp; Major</a></li>
              <li><a href="#academic">B.Tech CSE Mini &amp; Major</a></li>
              <li><a href="#academic">MCA Final Year Software</a></li>
              <li><a href="#academic">AI / Machine Learning Projects</a></li>
              <li><a href="#academic">Custom Code Refactoring</a></li>
              <li><a href="#enquiry">Request Quote &amp; Synopsis</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AR Tech Solutions. All rights reserved &bull; Professional IT &amp; Academic Development.</p>
          <p>Kadapa &amp; Rayachoti, Andhra Pradesh, India</p>
        </div>
      </div>
    </footer>
  )
}
