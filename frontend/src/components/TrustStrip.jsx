export default function TrustStrip() {
  const pillars = [
    {
      icon: '⚡',
      title: '48–72h Express Delivery',
      desc: 'Immediate kick-off for tight submission dates and college deadlines with milestone updates.',
      badge: 'SPEED',
    },
    {
      icon: '💻',
      title: 'Full Source Code & Setup',
      desc: 'Unlocked clean modular code with 1-on-1 screen share setup directly on your laptop.',
      badge: 'VERIFIED',
    },
    {
      icon: '📑',
      title: 'IEEE Documentation & PPT',
      desc: 'Complete project report, UML diagrams, methodology, and formatted slides ready for submission.',
      badge: 'COMPLETE',
    },
    {
      icon: '🎓',
      title: '1-on-1 Viva Defense Prep',
      desc: 'Personal viva coaching with common examiner questions, algorithm explanations & code walkthroughs.',
      badge: 'GUARANTEE',
    },
  ]

  return (
    <section className="trust-strip-section">
      <div className="container">
        <div className="trust-strip-header">
          <span className="section-badge-glow">🛡️ THE AR TECH ADVANTAGE</span>
          <h3>Every Package Comes With Complete Engineering Assurance</h3>
        </div>

        <div className="trust-strip-grid">
          {pillars.map((p) => (
            <div className="trust-card" key={p.title}>
              <div className="trust-card-top">
                <span className="trust-icon">{p.icon}</span>
                <span className="trust-badge">{p.badge}</span>
              </div>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
