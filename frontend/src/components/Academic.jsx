const projects = [
  { icon: '🎓', title: 'Student Projects', desc: 'Customized projects for all engineering & diploma branches.' },
  { icon: '📐', title: 'Diploma Mini Projects', desc: 'Fast-turnaround, structured code with circuit/block diagrams.' },
  { icon: '📡', title: 'Diploma ECE Projects', desc: 'Embedded systems, wireless sensors & communication hardware.' },
  { icon: '🖥️', title: 'Diploma CSE Projects', desc: 'Web apps, database management & algorithm implementations.' },
  { icon: '⚡', title: 'B.Tech ECE Mini Projects', desc: 'Arduino, ESP32, Raspberry Pi, IoT & real-time embedded modules.' },
  { icon: '💡', title: 'B.Tech CSE Mini Projects', desc: 'Full-stack web applications, REST APIs & cloud integrations.' },
  { icon: '🔬', title: 'B.Tech ECE Major Projects', desc: 'Signal processing, advanced IoT robotics, VLSI & automation.' },
  { icon: '🚀', title: 'B.Tech CSE Major Projects', desc: 'AI / Machine Learning models, cloud platforms & high-scale apps.' },
  { icon: '🧑‍💻', title: 'MCA Major Projects', desc: 'Enterprise-grade architecture, database optimization & security.' },
  { icon: '🛠️', title: 'Project Customization', desc: 'Add new modules, upgrade tech stack, or refine existing code.' },
  { icon: '🔄', title: 'Project Maintenance & Fixes', desc: 'Debugging run-time errors, database connection & environment setup.' },
  { icon: '📞', title: 'Comprehensive Viva Support', desc: 'Complete project report, IEEE documentation & PPT presentation slides.' },
]

export default function Academic() {
  return (
    <section className="section-dark" id="academic">
      <div className="container">
        <div className="text-center">
          <span className="section-badge-dark">
            Academic &amp; Student Engineering Hub
          </span>
          <h2 className="section-title-dark">
            Academic &amp; Final-Year Project Solutions
          </h2>
          <p className="section-sub-dark">
            Every academic project is built from scratch and 100% customized according to your specific university syllabus,
            hardware constraints, and professor guidelines.
          </p>
        </div>

        <div className="academic-grid">
          {projects.map((p) => (
            <div className="academic-card" key={p.title}>
              <div className="a-icon">{p.icon}</div>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a href="#enquiry" className="btn btn-primary">
            📋 Discuss Your College Project with Us
          </a>
        </div>
      </div>
    </section>
  )
}
