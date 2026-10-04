const socials = [
  { icon: '💬', label: 'WhatsApp', sub: 'Instant chat & enquiry', href: 'https://wa.me/919390011965' },
  { icon: '📧', label: 'Official Gmail', sub: 'Project briefs & documents', href: 'mailto:palagiriasma477@gmail.com' },
  { icon: '📸', label: 'Instagram', sub: 'Updates & demos', href: 'https://instagram.com' },
  { icon: '👤', label: 'Facebook', sub: 'Community & announcements', href: 'https://facebook.com' },
  { icon: '🐦', label: 'Twitter / X', sub: 'Tech insights', href: 'https://twitter.com' },
  { icon: '💻', label: 'GitHub', sub: 'Code repositories', href: 'https://github.com' },
  { icon: '🔗', label: 'LinkedIn', sub: 'Professional network', href: 'https://linkedin.com' },
]

export default function Contact() {
  return (
    <section className="section-dark" id="contact">
      <div className="container">
        <div className="text-center">
          <span className="section-badge-dark">
            Direct Communication Channels
          </span>
          <h2 className="section-title-dark">Connect With AR Tech Solutions</h2>
          <p className="section-sub-dark">
            Reach out through your preferred platform. Our team is available for student project consultations,
            corporate quotes, and technical partnerships.
          </p>
        </div>

        {/* Social / Direct Links Grid */}
        <div className="contact-grid">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="contact-social-card"
            >
              <div className="contact-social-icon">{s.icon}</div>
              <h4>{s.label}</h4>
              <p>{s.sub}</p>
            </a>
          ))}
        </div>

        {/* Physical Office Hub Locations */}
        <div className="text-center" style={{ marginBottom: 28 }}>
          <span className="section-badge-dark">
            Regional Presence
          </span>
        </div>
        <div className="locations-grid">
          <div className="location-card">
            <h4>📍 Kadapa Center</h4>
            <p>YSR Kadapa District, Andhra Pradesh, India &bull; Serving academic colleges &amp; local enterprises</p>
            <a
              href="https://maps.google.com/?q=Kadapa,Andhra+Pradesh"
              target="_blank"
              rel="noreferrer"
              className="location-link"
            >
              Open Kadapa on Google Maps &rarr;
            </a>
          </div>
          <div className="location-card">
            <h4>📍 Rayachoti Center</h4>
            <p>Rayachoti, Annamayya / YSR District, Andhra Pradesh, India &bull; Engineering project consulting</p>
            <a
              href="https://maps.google.com/?q=Rayachoti,Andhra+Pradesh"
              target="_blank"
              rel="noreferrer"
              className="location-link"
            >
              Open Rayachoti on Google Maps &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
