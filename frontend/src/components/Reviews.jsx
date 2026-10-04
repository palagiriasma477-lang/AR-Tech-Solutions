const reviews = [
  {
    stars: 5,
    text: '"AR Tech Solutions built my B.Tech CSE major project exactly the way I wanted. The code was clean, well-documented, and delivered on time. Highly recommended for any student project!"',
    name: 'Ravi Kumar',
    role: 'B.Tech CSE Graduate, JNTUA',
  },
  {
    stars: 5,
    text: '"They developed our company website with a professional design and all the features we needed. Great communication throughout the project. Very satisfied with the result."',
    name: 'Suresh Reddy',
    role: 'Business Owner, Kadapa',
  },
  {
    stars: 5,
    text: '"I needed an AI-based attendance system for my final year project. The team guided me through the entire process and delivered something beyond my expectations."',
    name: 'Priya Sharma',
    role: 'B.Tech ECE Student',
  },
  {
    stars: 5,
    text: '"Quick response, transparent pricing, and excellent quality. They understood my requirements perfectly and built a mobile app that works flawlessly."',
    name: 'Anitha Rani',
    role: 'MCA Student, Rayachoti',
  },
  {
    stars: 5,
    text: '"Good team, solid work. My diploma mini project was ready in just 3 days with full documentation and PPT. Would definitely come back for future projects."',
    name: 'Kiran Babu',
    role: 'Diploma ECE Student',
  },
  {
    stars: 5,
    text: '"Professional, reliable, and easy to work with. They helped me customize an existing project and added new features perfectly. Great support after delivery too."',
    name: 'Venkat Naidu',
    role: 'Software Developer, Kadapa',
  },
]

function Stars({ count }) {
  return (
    <div className="review-stars">
      {'★'.repeat(count)}{'☆'.repeat(5 - count)}
    </div>
  )
}

export default function Reviews() {
  return (
    <section className="section-alt" id="reviews">
      <div className="container">
        <div className="text-center">
          <span className="section-badge">Client Testimonials</span>
          <h2 className="section-title">Verified Student &amp; Client Feedback</h2>
          <p className="section-sub">
            Real feedback from engineering students, startups, and local business owners
            who partnered with AR Tech Solutions.
          </p>
        </div>

        <div className="reviews-grid">
          {reviews.map((r) => (
            <div className="review-card" key={r.name}>
              <Stars count={r.stars} />
              <p className="review-text">{r.text}</p>
              <div className="reviewer">
                <div className="reviewer-avatar">{r.name[0]}</div>
                <div>
                  <div className="reviewer-name">{r.name}</div>
                  <div className="reviewer-role">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
