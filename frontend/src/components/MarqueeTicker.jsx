export default function MarqueeTicker() {
  const techItems = [
    '⚡ React.js & Vite',
    '🐍 Python AI / ML & Deep Learning',
    '📱 Flutter & React Native Apps',
    '⚡ IoT microcontrollers & ESP32',
    '🌐 Node.js & Express Backends',
    '🍃 MongoDB & SQL Databases',
    '☁️ Live Cloud Hosting on Vercel & AWS',
    '🤖 OpenCV & Computer Vision',
    '📊 Data Science & Automation Scripts',
    '🎨 Tailored Modern UI/UX Design',
  ]

  const guaranteeItems = [
    '🏆 100% Running Code Verified on Your Laptop',
    '⚡ Express 48–72h Project Turnaround',
    '📄 Complete IEEE Project Report & PPT Included',
    '🎯 Step-by-Step Viva Question Bank & Coaching',
    '🛡️ 100% Zero Plagiarism & Custom Architecture',
    '💬 Direct WhatsApp & Call Support With Tech Leads',
    '🚀 Free Minor Post-Delivery Customizations',
    '🎓 Proven High Scores in University Submissions',
  ]

  return (
    <div className="marquee-wrapper">
      {/* Track 1: Technologies & Frameworks */}
      <div className="marquee-track marquee-track-primary">
        <div className="marquee-content">
          {techItems.concat(techItems).map((item, idx) => (
            <span key={idx} className="marquee-item marquee-item-tech">
              {item}
              <span className="marquee-separator">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Track 2: Core Guarantees & Turnarounds */}
      <div className="marquee-track marquee-track-secondary">
        <div className="marquee-content marquee-reverse">
          {guaranteeItems.concat(guaranteeItems).map((item, idx) => (
            <span key={idx} className="marquee-item marquee-item-guarantee">
              {item}
              <span className="marquee-separator">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
