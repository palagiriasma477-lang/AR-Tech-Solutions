const services = [
  {
    icon: '🌐',
    title: 'Website Development',
    desc: 'Modern, ultra-responsive corporate websites with high SEO visibility, fluid design, and lightning-fast loading speeds.',
  },
  {
    icon: '⚙️',
    title: 'Web Applications',
    desc: 'Scalable full-stack web platforms built with React, Node.js, Python, robust SQL/NoSQL databases, and seamless APIs.',
  },
  {
    icon: '📱',
    title: 'Mobile Applications',
    desc: 'High-performance Android and iOS apps crafted with modern cross-platform frameworks for engaging user experiences.',
  },
  {
    icon: '💻',
    title: 'Software Development',
    desc: 'Bespoke enterprise software, workflow automation systems, inventory management tools, and desktop solutions.',
  },
  {
    icon: '🎓',
    title: 'AI / ML Academic Projects',
    desc: 'End-to-end Machine Learning, Computer Vision, and Data Science models for B.Tech, MCA & research project requirements.',
  },
  {
    icon: '☁️',
    title: 'Cloud Solutions & Hosting',
    desc: 'Cloud architecture, secure containerization, and persistent deployment on AWS, Railway, Google Cloud, and Vercel.',
  },
  {
    icon: '🧠',
    title: 'IT Consulting & Architecture',
    desc: 'Expert technical guidance on technology selection, database modeling, security best practices, and system design.',
  },
  {
    icon: '📣',
    title: 'Digital Marketing & Growth',
    desc: 'Search Engine Optimization (SEO), digital presence elevation, and online campaign strategies for local and global reach.',
  },
  {
    icon: '🔧',
    title: 'Maintenance & Code Upgrades',
    desc: 'Ongoing technical support, bug resolution, server management, feature upgrades, and continuous performance tuning.',
  },
]

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="text-center">
          <span className="section-badge">Commercial &amp; Technical Capabilities</span>
          <h2 className="section-title">Core IT &amp; Engineering Services</h2>
          <p className="section-sub">
            From initial concept wireframes to production deployment, we deliver high-reliability solutions
            for businesses, startups, and academic students.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s) => (
            <div className="service-card" key={s.title}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <a href="#enquiry" className="service-link">
                Request Scope &amp; Quote &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
