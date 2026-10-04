const steps = [
  { num: 1, emoji: '📝', title: '1. Submit Enquiry', desc: 'Fill in your project details & scope using our form.' },
  { num: 2, emoji: '💬', title: '2. Discuss Scope', desc: 'Direct WhatsApp/phone consultation to refine requirements.' },
  { num: 3, emoji: '🎯', title: '3. Finalize Tech Stack', desc: 'Confirm architecture, libraries, milestone dates & quote.' },
  { num: 4, emoji: '📦', title: '4. Select Package', desc: 'Pick the package matching your budget and complexity.' },
  { num: 5, emoji: '⚙️', title: '5. Agile Development', desc: 'Engineered with clean code, modular components & database.' },
  { num: 6, emoji: '🔍', title: '6. Rigorous QA Testing', desc: 'Validation across responsive viewports, edge cases & errors.' },
  { num: 7, emoji: '🚀', title: '7. Final Delivery', desc: 'Complete source code, deployment setup & documentation guide.' },
  { num: 8, emoji: '🛡️', title: '8. Post-Delivery Support', desc: 'Assistance during college reviews, viva prep & maintenance.' },
]

export default function Process() {
  return (
    <section className="section-alt" id="process">
      <div className="container">
        <div className="text-center">
          <span className="section-badge">Structured Delivery</span>
          <h2 className="section-title">End-to-End Engineering Workflow</h2>
          <p className="section-sub">
            A transparent 8-step methodology ensuring your project finishes on schedule, runs without bugs,
            and meets every academic and business criterion.
          </p>
        </div>

        <div className="process-steps">
          {steps.map((s) => (
            <div className="process-step" key={s.num}>
              <div className="step-num">{s.emoji}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
