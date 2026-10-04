const reasons = [
  { icon: '🎯', title: '100% Customized Solutions', desc: 'Every project is engineered around your specific problem statement — zero generic templates.' },
  { icon: '👨‍💻', title: 'Industry-Standard Clean Code', desc: 'Modular architecture, readable commenting, and reliable modern development standards.' },
  { icon: '🔬', title: 'Modern Tech Stacks', desc: 'React, Node.js, Python, IoT microcontrollers, SQL/NoSQL databases & cloud hosting.' },
  { icon: '🎓', title: 'Student & Corporate Expertise', desc: 'Equally adept at delivering fast-deadline college projects and commercial applications.' },
  { icon: '📦', title: 'Flexible Non-Rigid Packages', desc: 'No forced bloated features. Pay only for the specific scope, complexity, and modules you need.' },
  { icon: '💬', title: 'Rapid WhatsApp & Call Communication', desc: 'Direct access to coordinators. Immediate progress updates and responsive milestone check-ins.' },
  { icon: '🔄', title: 'End-to-End Milestone Support', desc: 'From initial proposal and database design to testing, report preparation, and live delivery.' },
  { icon: '🛡️', title: 'Privacy & Data Integrity', desc: 'Your project source code, data, and contact details are handled with strict privacy.' },
]

export default function WhyUs() {
  return (
    <section className="section-dark" id="why">
      <div className="container">
        <div className="text-center">
          <span className="section-badge-dark">
            Why Partner With Us
          </span>
          <h2 className="section-title-dark">Why Choose AR Tech Solutions?</h2>
          <p className="section-sub-dark">
            We bridge the gap between academic deadlines and professional IT excellence.
          </p>
        </div>

        <div className="why-grid">
          {reasons.map((r) => (
            <div className="why-card" key={r.title}>
              <div className="why-icon">{r.icon}</div>
              <h4>{r.title}</h4>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
