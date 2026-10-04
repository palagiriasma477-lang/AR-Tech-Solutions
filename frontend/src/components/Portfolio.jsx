const items = [
  {
    emoji: '🛒',
    type: 'Full-Stack Web App',
    title: 'E-Commerce & Vendor System',
    desc: 'Scalable commercial web store with product catalogs, shopping cart, admin dashboard & payment integration.',
    tags: ['React', 'Node.js', 'Express', 'SQLite/MySQL'],
  },
  {
    emoji: '🤖',
    type: 'B.Tech CSE Major Project',
    title: 'AI Smart Surveillance & Face Recognition',
    desc: 'Deep learning computer vision system for real-time automated identity tracking with IEEE-standard documentation.',
    tags: ['Python', 'OpenCV', 'TensorFlow', 'Flask'],
  },
  {
    emoji: '📱',
    type: 'Mobile Application',
    title: 'Campus Student & Faculty Portal App',
    desc: 'Cross-platform mobile application providing attendance analytics, timetable notifications, and exam mark registers.',
    tags: ['React Native', 'Firebase', 'REST API'],
  },
  {
    emoji: '⚡',
    type: 'Diploma / B.Tech ECE Project',
    title: 'IoT Smart Energy & Device Automation',
    desc: 'Hardware IoT prototype featuring ESP32 Wi-Fi microcontroller, relay modules, sensor telemetry & mobile dashboard.',
    tags: ['IoT', 'ESP32', 'Arduino C++', 'MQTT'],
  },
  {
    emoji: '🌐',
    type: 'Corporate Website',
    title: 'Business Corporate Presence Portal',
    desc: 'Fast, high-converting responsive company website with dynamic enquiry forms, service showcase & admin panel.',
    tags: ['React', 'Vite', 'Node.js', 'Tailored CSS'],
  },
  {
    emoji: '📊',
    type: 'Enterprise Software',
    title: 'Automated Stock & Billing Management',
    desc: 'Desktop software application with barcode compatibility, inventory tracking, GST calculation & Excel report exports.',
    tags: ['Python', 'SQLite', 'Tkinter/PyQt'],
  },
]

export default function Portfolio() {
  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="text-center">
          <span className="section-badge">Project Capabilities</span>
          <h2 className="section-title">Technical Demonstrations &amp; Blueprints</h2>
          <p className="section-sub">
            Representative sample architectures and project prototypes ready to be customized
            to your academic syllabus or specific business workflow.
          </p>
        </div>

        <div className="portfolio-grid">
          {items.map((item) => (
            <div className="portfolio-card" key={item.title}>
              <div className="portfolio-img">{item.emoji}</div>
              <div className="portfolio-body">
                <div className="portfolio-type">{item.type}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="portfolio-tags">
                  {item.tags.map((t) => (
                    <span className="portfolio-tag" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: 44 }}>
          <a href="#enquiry" className="btn btn-primary">
            🚀 Launch Your Next Project With Us
          </a>
        </div>
      </div>
    </section>
  )
}
