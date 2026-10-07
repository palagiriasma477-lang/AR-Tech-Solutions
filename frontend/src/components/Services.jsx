import { useState } from 'react'

const services = [
  {
    id: 'web-dev',
    icon: '🌐',
    title: 'Website Development',
    badge: 'High Conversion',
    tagline: 'SEO-Optimized & Ultra-Fast',
    desc: 'Modern, ultra-responsive corporate websites with high SEO visibility, fluid design, and lightning-fast loading speeds.',
    tags: ['Next.js / Vite', 'Tailwind CSS', 'SEO Rich Snippets', 'Sub-second Load'],
    codePreview: {
      lang: 'jsx',
      filename: 'LandingPage.tsx',
      lines: [
        'const Hero = () => (',
        '  <motion.div initial={{ opacity: 0 }}',
        '    animate={{ opacity: 1, scale: 1 }}',
        '    className="seo-optimized hero-grid">',
        '    <LiveConversionBanner />',
        '  </motion.div>',
        ');',
      ],
    },
    metric: '99+ PageSpeed',
  },
  {
    id: 'web-apps',
    icon: '⚙️',
    title: 'Web Applications',
    badge: 'Enterprise Architecture',
    tagline: 'Scalable Full-Stack Systems',
    desc: 'Scalable full-stack web platforms built with React, Node.js, Python, robust SQL/NoSQL databases, and seamless APIs.',
    tags: ['React + Node.js', 'PostgreSQL / Mongo', 'REST & GraphQL', 'Auth0 / JWT'],
    codePreview: {
      lang: 'typescript',
      filename: 'api-controller.ts',
      lines: [
        '@Post("/api/v1/cluster")',
        'async deployService(@Body() payload) {',
        '  const db = await pool.connect();',
        '  return await cluster.spawnWorkers({',
        '    concurrency: 64, timeout: "50ms"',
        '  });',
        '}',
      ],
    },
    metric: '99.99% Uptime',
  },
  {
    id: 'mobile-apps',
    icon: '📱',
    title: 'Mobile Applications',
    badge: 'iOS & Android Native Feel',
    tagline: 'Smooth 60FPS Cross-Platform Apps',
    desc: 'High-performance Android and iOS apps crafted with modern cross-platform frameworks for engaging user experiences.',
    tags: ['React Native / Flutter', 'Offline Sync', 'Push Notifications', 'Biometric Auth'],
    codePreview: {
      lang: 'dart',
      filename: 'AppScreen.dart',
      lines: [
        'Widget build(BuildContext context) {',
        '  return Scaffold(',
        '    body: SmoothMotionTransition(',
        '      physics: BouncingScrollPhysics(),',
        '      child: HapticFeedbackView(),',
        '    ),',
        '  );',
        '}',
      ],
    },
    metric: '60 FPS Smoothness',
  },
  {
    id: 'software-dev',
    icon: '💻',
    title: 'Software Development',
    badge: 'Custom Automation',
    tagline: 'Bespoke Enterprise Systems',
    desc: 'Bespoke enterprise software, workflow automation systems, inventory management tools, and desktop solutions.',
    tags: ['Electron / Python / C#', 'Role-Based ACL', 'Automated Backups', 'Real-time Sync'],
    codePreview: {
      lang: 'python',
      filename: 'automation_core.py',
      lines: [
        'class EnterpriseEngine:',
        '  def dispatch_jobs(self, batch):',
        '    with ThreadPool(workers=16) as pool:',
        '      return pool.map(self.audit, batch)',
        '    logger.info("Processed 10,000+ rows")',
      ],
    },
    metric: 'Zero-Lag Core',
  },
  {
    id: 'academic-aiml',
    icon: '🎓',
    title: 'AI / ML Academic Projects',
    badge: 'IEEE Verified',
    tagline: 'Deep Learning & Vision Models',
    desc: 'End-to-end Machine Learning, Computer Vision, and Data Science models for B.Tech, MCA & research project requirements.',
    tags: ['PyTorch / TensorFlow', 'CNN / YOLO / Transformers', 'Complete IEEE Report', 'Viva Prep'],
    codePreview: {
      lang: 'python',
      filename: 'model_train.py',
      lines: [
        'model = VisionTransformer.load("vit_base")',
        'criterion = FocalLoss(alpha=0.25)',
        'accuracy = evaluate(model, test_loader)',
        'print(f"Validation F1: {accuracy:.4f}")',
        '# Ready for Final Presentation',
      ],
    },
    metric: '98.4% Accuracy',
  },
  {
    id: 'cloud-hosting',
    icon: '☁️',
    title: 'Cloud Solutions & Hosting',
    badge: 'DevOps & Docker',
    tagline: 'Reliable Container Infrastructure',
    desc: 'Cloud architecture, secure containerization, and persistent deployment on AWS, Railway, Google Cloud, and Vercel.',
    tags: ['Docker & K8s', 'AWS / Google Cloud', 'CI/CD Pipelines', 'Auto-scaling'],
    codePreview: {
      lang: 'yaml',
      filename: 'deploy-infra.yml',
      lines: [
        'deploy:',
        '  replicas: 5',
        '  restart_policy: always',
        '  healthcheck:',
        '    test: ["CMD", "curl", "-f", "/health"]',
        '    interval: 10s',
      ],
    },
    metric: 'Auto-Scaling',
  },
  {
    id: 'it-consulting',
    icon: '🧠',
    title: 'IT Consulting & Architecture',
    badge: 'Tech Strategy',
    tagline: 'Database & System Optimization',
    desc: 'Expert technical guidance on technology selection, database modeling, security best practices, and system design.',
    tags: ['Microservices', 'Database Sharding', 'Security Audits', 'Tech Stack Selection'],
    codePreview: {
      lang: 'sql',
      filename: 'schema_opt.sql',
      lines: [
        'CREATE INDEX CONCURRENTLY idx_fast_query',
        '  ON transactions (user_id, created_at)',
        '  INCLUDE (amount, status);',
        '-- Query latency reduced from 800ms -> 3ms',
      ],
    },
    metric: 'Sub-5ms Latency',
  },
  {
    id: 'digital-marketing',
    icon: '📣',
    title: 'Digital Marketing & Growth',
    badge: 'ROI Focused',
    tagline: 'Targeted Traffic & Local SEO',
    desc: 'Search Engine Optimization (SEO), digital presence elevation, and online campaign strategies for local and global reach.',
    tags: ['Google Business SEO', 'Keyword Dominance', 'Meta Campaign Strategy', 'Conversion Rate (CRO)'],
    codePreview: {
      lang: 'json',
      filename: 'analytics_target.json',
      lines: [
        '{',
        '  "campaign": "Google High Intent",',
        '  "organicReach": "+340%",',
        '  "costPerLead": "Optimized -48%",',
        '  "targetRank": "#1 Google SERP"',
        '}',
      ],
    },
    metric: '3.8x ROI',
  },
  {
    id: 'maintenance',
    icon: '🔧',
    title: 'Maintenance & Upgrades',
    badge: 'Continuous SLA',
    tagline: '24/7 Monitoring & Bug Resolution',
    desc: 'Ongoing technical support, bug resolution, server management, feature upgrades, and continuous performance tuning.',
    tags: ['Dependency Security Patch', '24/7 Error Sentry', 'Code Refactoring', 'Fast Hotline'],
    codePreview: {
      lang: 'bash',
      filename: 'sla_monitor.sh',
      lines: [
        '#!/usr/bin/env bash',
        'echo "Monitoring 24/7 service heartbeat..."',
        'npm audit --audit-level=high && \\',
        'git checkout -b chore/patch-v2.4 && \\',
        'echo "Systems healthy, 0 vulnerabilities"',
      ],
    },
    metric: '24/7 Active SLA',
  },
]

export default function Services() {
  const [activeCodeId, setActiveCodeId] = useState(null)

  return (
    <section className="section services-modern-section" id="services">
      <div className="container">
        <div className="text-center">
          <div className="section-badge-animated">
            <span className="badge-glow-dot"></span>
            <span>Commercial &amp; Technical Capabilities</span>
          </div>
          <h2 className="section-title">Core IT &amp; Engineering Services</h2>
          <p className="section-sub">
            From initial concept wireframes to production deployment, we deliver high-reliability solutions
            for businesses, startups, and academic students with live code transparency.
          </p>
        </div>

        <div className="services-grid modern-services-grid">
          {services.map((s) => {
            const isCodeOpen = activeCodeId === s.id
            return (
              <div 
                className={`service-card modern-service-card ${isCodeOpen ? 'code-expanded' : ''}`} 
                key={s.id}
              >
                {/* Top Ambient Card Glow */}
                <div className="card-ambient-glow"></div>

                {/* Card Header & Badge */}
                <div className="service-card-top">
                  <div className="service-icon-box">
                    <span className="service-icon-emoji">{s.icon}</span>
                    <span className="icon-pulse-ring"></span>
                  </div>
                  <div className="service-meta-badges">
                    <span className="service-category-badge">{s.badge}</span>
                    <span className="service-metric-tag">{s.metric}</span>
                  </div>
                </div>

                {/* Service Title & Subtitle */}
                <h3 className="service-title-text">{s.title}</h3>
                <span className="service-tagline-text">{s.tagline}</span>

                {/* Service Description */}
                <p className="service-description-text">{s.desc}</p>

                {/* Tech Tags Pill Grid */}
                <div className="service-tech-tags">
                  {s.tags.map((t, idx) => (
                    <span key={idx} className="tech-pill">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Interactive Live Code / Architecture Drawer Toggle */}
                <div className="service-code-toggle-bar">
                  <button
                    type="button"
                    onClick={() => setActiveCodeId(isCodeOpen ? null : s.id)}
                    className="code-toggle-btn"
                    title="Inspect Engineering Code & Architecture"
                  >
                    <span className="code-icon-tag">&lt;/&gt;</span>
                    <span>{isCodeOpen ? 'Hide Engineering Code' : 'View Production Code'}</span>
                    <span className="toggle-chevron">{isCodeOpen ? '▲' : '▼'}</span>
                  </button>
                </div>

                {/* Live Engineering Code Terminal Window */}
                {isCodeOpen && (
                  <div className="service-terminal-window">
                    <div className="terminal-header">
                      <div className="terminal-dots">
                        <span className="dot dot-red"></span>
                        <span className="dot dot-yellow"></span>
                        <span className="dot dot-green"></span>
                      </div>
                      <span className="terminal-filename">{s.codePreview.filename}</span>
                      <span className="terminal-badge">{s.codePreview.lang}</span>
                    </div>
                    <pre className="terminal-code-body">
                      <code>
                        {s.codePreview.lines.map((line, lIdx) => (
                          <div key={lIdx} className="terminal-line">
                            <span className="line-num">{lIdx + 1}</span>
                            <span className="line-code">{line}</span>
                          </div>
                        ))}
                      </code>
                    </pre>
                  </div>
                )}

                {/* Card Action Link */}
                <div className="service-card-footer">
                  <a href="#enquiry" className="service-link modern-service-link">
                    <span>Request Scope &amp; Quote</span>
                    <span className="link-arrow">&rarr;</span>
                  </a>
                  <span className="service-status-online">
                    <span className="online-indicator-dot"></span>
                    Ready to Build
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
