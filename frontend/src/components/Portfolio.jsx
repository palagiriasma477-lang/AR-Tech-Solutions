import { useState } from 'react'

const portfolioItems = [
  {
    id: 'ecommerce-system',
    category: 'Commercial Full-Stack',
    title: 'E-Commerce & Multi-Vendor Engine',
    desc: 'Scalable commercial web store with product catalogs, shopping cart, admin telemetry, and payment gateway integration.',
    tags: ['React', 'Node.js', 'Express', 'SQLite/Postgres', 'Stripe/Razorpay'],
    metrics: { badge: 'Production Ready', loadSpeed: '0.4s', scale: '10K+ Orders' },
    previewTheme: 'store',
    codeSnippet: 'const order = await checkout.process({ items, currency: "INR" });',
    deliverables: ['100% Source Code', 'Admin Dashboard', 'Setup Guide', 'Database Schema'],
  },
  {
    id: 'ai-surveillance',
    category: 'B.Tech CSE Major (IEEE)',
    title: 'AI Smart Surveillance & Face Recognition',
    desc: 'Deep learning computer vision system for real-time automated identity tracking with IEEE-standard research documentation.',
    tags: ['Python', 'OpenCV', 'TensorFlow / YOLO', 'Flask API'],
    metrics: { badge: 'IEEE Standard', loadSpeed: '30 FPS', scale: '98.7% Accuracy' },
    previewTheme: 'ai',
    codeSnippet: 'detections = yolo_engine.infer(frame, conf_threshold=0.85)',
    deliverables: ['IEEE Format Report', 'PPT (35+ Slides)', 'Live Viva Q&A Guide', 'Video Demo'],
  },
  {
    id: 'campus-portal',
    category: 'Cross-Platform Mobile',
    title: 'Campus Student & Faculty Portal App',
    desc: 'Cross-platform mobile application providing attendance analytics, timetable notifications, and exam mark registers.',
    tags: ['React Native', 'Firebase', 'Node REST API', 'Cloud Messaging'],
    metrics: { badge: 'iOS & Android', loadSpeed: '60 FPS', scale: '5,000+ Students' },
    previewTheme: 'mobile',
    codeSnippet: 'await PushNotifications.broadcastToSection("CSE-A", alert);',
    deliverables: ['APK / Source Code', 'Role-Based Auth', 'API Documentation', 'Screen Record'],
  },
  {
    id: 'iot-energy',
    category: 'Diploma / B.Tech ECE Major',
    title: 'IoT Smart Energy & Hardware Telemetry',
    desc: 'Hardware IoT prototype featuring ESP32 Wi-Fi microcontroller, relay modules, sensor telemetry & mobile dashboard.',
    tags: ['ESP32 Microcontroller', 'Arduino C++', 'MQTT Protocol', 'Web Dashboard'],
    metrics: { badge: 'Hardware + Web', loadSpeed: '< 50ms', scale: 'Live Telemetry' },
    previewTheme: 'iot',
    codeSnippet: 'client.publish("sensors/energy", payload.c_str(), true);',
    deliverables: ['Circuit Diagram', 'ESP32 Firmware Code', 'Component List', 'IEEE Report'],
  },
  {
    id: 'corporate-portal',
    category: 'Enterprise Corporate Web',
    title: 'Business Corporate Presence Portal',
    desc: 'Fast, high-converting responsive company website with dynamic enquiry forms, service showcase & admin lead tracking.',
    tags: ['React', 'Vite', 'Node.js', 'Tailwind', 'Lead Analytics'],
    metrics: { badge: 'High Conversion', loadSpeed: '99 Score', scale: 'SEO Top Rank' },
    previewTheme: 'web',
    codeSnippet: '<LeadTracker onConversion={(lead) => notifyAdmin(lead)} />',
    deliverables: ['Mobile Responsive', 'Admin Dashboard', 'Domain + Hosting Setup', 'SSL Cert'],
  },
  {
    id: 'stock-billing',
    category: 'Desktop & Enterprise App',
    title: 'Automated Stock & Billing Management',
    desc: 'Desktop software application with barcode compatibility, inventory tracking, GST calculation & Excel report exports.',
    tags: ['Python', 'SQLite', 'PyQt / Tkinter', 'Excel Automation'],
    metrics: { badge: 'Zero Lag Core', loadSpeed: 'Offline Capable', scale: '50K SKUs' },
    previewTheme: 'desktop',
    codeSnippet: 'invoice_gen.build_gst_pdf(bill_items, output_path="pdf/")',
    deliverables: ['Executable (.exe)', 'GST Invoice Module', 'Source Code', 'User Manual'],
  },
]

export default function Portfolio() {
  const [filter, setFilter] = useState('ALL')
  const [inspectItem, setInspectItem] = useState(null)

  const filteredItems = filter === 'ALL' 
    ? portfolioItems 
    : portfolioItems.filter(item => {
        if (filter === 'ACADEMIC') return item.category.includes('B.Tech') || item.category.includes('ECE') || item.category.includes('CSE')
        if (filter === 'COMMERCIAL') return item.category.includes('Commercial') || item.category.includes('Corporate') || item.category.includes('Enterprise')
        if (filter === 'MOBILE') return item.category.includes('Mobile')
        return true
      })

  return (
    <section className="section-dark modern-portfolio-section" id="portfolio">
      <div className="container">
        <div className="text-center">
          <div className="section-badge-animated">
            <span className="badge-glow-dot"></span>
            <span>Live Project Showcase</span>
          </div>
          <h2 className="section-title-dark">Proven Project Blueprints Ready for Delivery</h2>
          <p className="section-sub-dark">
            Explore ready-to-deploy software architectures and academic project frameworks.
            Every project includes 100% working source code, PPT presentation, and comprehensive documentation tailored to your requirements.
          </p>

          {/* Interactive Filter Pills */}
          <div className="portfolio-filter-tabs">
            {[
              { id: 'ALL', label: '🌟 All Blueprints' },
              { id: 'ACADEMIC', label: '🎓 Academic & IEEE Projects' },
              { id: 'COMMERCIAL', label: '💼 Commercial & Web Apps' },
              { id: 'MOBILE', label: '📱 Mobile Applications' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`filter-pill-btn ${filter === tab.id ? 'active' : ''}`}
                onClick={() => setFilter(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Showcase Grid with Simulated Browser Frames */}
        <div className="modern-portfolio-grid">
          {filteredItems.map((item) => (
            <div className="modern-project-card" key={item.id}>
              {/* Simulated Browser / System Frame */}
              <div className="project-mockup-frame">
                <div className="frame-header-bar">
                  <div className="frame-traffic-dots">
                    <span className="f-dot dot-red"></span>
                    <span className="f-dot dot-yellow"></span>
                    <span className="f-dot dot-green"></span>
                  </div>
                  <div className="frame-url-bar">
                    <span className="frame-lock-icon">🔒</span>
                    <span className="frame-url-text">demo.{item.id}.ar-tech.io</span>
                  </div>
                  <span className="frame-badge-status">{item.metrics.badge}</span>
                </div>

                {/* Simulated UI Canvas / Terminal Graphics */}
                <div className={`frame-canvas canvas-${item.previewTheme}`}>
                  <div className="canvas-grid-overlay"></div>
                  <div className="canvas-content-box">
                    <div className="canvas-metric-row">
                      <span className="c-pill">{item.metrics.loadSpeed}</span>
                      <span className="c-pill-neon">{item.metrics.scale}</span>
                    </div>
                    <div className="canvas-code-badge">
                      <code>&gt; {item.codeSnippet}</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="project-card-body">
                <div className="project-category-row">
                  <span className="project-category-tag">{item.category}</span>
                  <span className="project-verified-tag">✓ Verified Code</span>
                </div>
                <h3 className="project-title-heading">{item.title}</h3>
                <p className="project-desc-text">{item.desc}</p>

                {/* Deliverables Checklist */}
                <div className="project-deliverables-list">
                  <span className="deliverable-label">Includes:</span>
                  <div className="deliverable-chips">
                    {item.deliverables.map((d, dIdx) => (
                      <span key={dIdx} className="d-chip">✦ {d}</span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="project-tech-tags">
                  {item.tags.map((t) => (
                    <span className="p-tech-pill" key={t}>{t}</span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="project-card-actions">
                  <a
                    href="#enquiry"
                    className="btn btn-outline-cyan btn-sm"
                    onClick={() => {
                      const sel = document.querySelector('select[name="requirements"]') || document.querySelector('textarea[name="requirements"]')
                      if (sel) sel.value = `Inquiring about project: ${item.title}`
                    }}
                  >
                    🚀 Request This Blueprint
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?phone=919390011965&text=${encodeURIComponent(`Hello AR Tech Solutions, I saw your blueprint: "${item.title}". Can you share the demo, price quote, and source code details?`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-wa-icon-only"
                    title="Ask on WhatsApp"
                  >
                    💬 Quick Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="portfolio-bottom-banner">
          <div className="p-banner-content">
            <h3>Need a Custom Topic or Specific IEEE Paper Implementation?</h3>
            <p>Our engineers implement customized Base Papers, custom datasets, and novel architectures on demand.</p>
          </div>
          <div className="p-banner-actions">
            <a href="#enquiry" className="btn btn-primary">
              ⚡ Request Custom Topic Implementation &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
