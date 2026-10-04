const tags = [
  'Custom Page Count',
  'Tailored Tech Stack',
  'Modular Features',
  'Custom UI/UX Design',
  'Hardware & IoT Interfaces',
  'Database Modeling',
  'API Integrations',
  'College IEEE Reports',
]

export default function CustomBanner() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="custom-banner">
          <h2>Every Project Is 100% Customized to Your Goal</h2>
          <p>
            We do not sell pre-packaged rigid templates. Whether you are an undergraduate engineering student
            facing strict project guidelines or a growing business building client software, our team builds
            directly around your explicit requirements.
          </p>
          <div className="custom-tags">
            {tags.map((t) => (
              <span className="custom-tag" key={t}>✦ {t}</span>
            ))}
          </div>
          <a href="#enquiry" className="btn btn-white">
            📝 Request Your Custom Project Blueprint
          </a>
        </div>
      </div>
    </section>
  )
}
