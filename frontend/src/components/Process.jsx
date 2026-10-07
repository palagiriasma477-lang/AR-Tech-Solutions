const steps = [
  {
    num: '01',
    phase: 'Discovery',
    title: 'Submit Scope & Goals',
    desc: 'Share your problem statement, syllabus guidelines, IEEE paper, or commercial requirements.',
    icon: '📝',
  },
  {
    num: '02',
    phase: 'Consultation',
    title: '1-on-1 Engineering Scope',
    desc: 'Direct consultation on WhatsApp or phone to finalize feature list, libraries, and milestone timeline.',
    icon: '💬',
  },
  {
    num: '03',
    phase: 'Architecture',
    title: 'Tech Stack & DB Design',
    desc: 'Selection of optimal frameworks, schema normalization, and modular component architecture.',
    icon: '⚙️',
  },
  {
    num: '04',
    phase: 'Development',
    title: 'Agile Clean Code Build',
    desc: 'Engineered with clean code commenting, responsive layouts, API security, and error handling.',
    icon: '💻',
  },
  {
    num: '05',
    phase: 'Testing',
    title: 'Rigorous QA & Edge Cases',
    desc: 'Validation across responsive viewports, DB query stress, and zero-error code compilation.',
    icon: '🔍',
  },
  {
    num: '06',
    phase: 'Setup',
    title: 'Live Laptop Screen-Share',
    desc: 'We execute and verify the complete project directly on your laptop via AnyDesk / TeamViewer.',
    icon: '🖥️',
  },
  {
    num: '07',
    phase: 'Delivery',
    title: 'Complete Deliverable Handover',
    desc: '100% source code, PPT presentation slides, and complete IEEE-standard project documentation.',
    icon: '📦',
  },
  {
    num: '08',
    phase: 'Guidance',
    title: 'Viva & Post-Review Support',
    desc: 'In-depth viva Q&A coaching and continuous assistance until final academic or client approval.',
    icon: '🎓',
  },
]

export default function Process() {
  return (
    <section className="section-dark modern-process-section" id="process">
      <div className="container">
        <div className="text-center">
          <div className="section-badge-animated">
            <span className="badge-glow-dot"></span>
            <span>Structured Delivery Pipeline</span>
          </div>
          <h2 className="section-title-dark">End-to-End Engineering Workflow</h2>
          <p className="section-sub-dark">
            A transparent 8-step methodology ensuring your project finishes on schedule, runs without bugs,
            and meets every academic and business criterion.
          </p>
        </div>

        {/* Process Circuit Grid with Connected Conduit Styling */}
        <div className="modern-process-grid">
          {steps.map((s, idx) => (
            <div className="modern-process-card" key={s.num}>
              {/* Step Top Header */}
              <div className="process-card-top">
                <span className="step-badge-num">{s.num}</span>
                <span className="step-phase-badge">{s.phase}</span>
                <span className="step-icon-emoji">{s.icon}</span>
              </div>

              {/* Title & Description */}
              <h4 className="step-title-text">{s.title}</h4>
              <p className="step-desc-text">{s.desc}</p>

              {/* Connector line indicator */}
              <div className="step-progress-indicator">
                <div className="step-progress-fill"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
