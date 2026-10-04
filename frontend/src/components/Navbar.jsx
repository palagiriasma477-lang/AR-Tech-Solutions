import { useState } from 'react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#academic' },
  { label: 'Packages', href: '#packages' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Why Us', href: '#why' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <a href="#home" className="navbar-logo">
          <div className="logo-icon">AR</div>
          AR Tech <span>Solutions</span>
        </a>

        {/* Desktop Links */}
        <ul className="navbar-links">
          {navLinks.map(l => (
            <li key={l.label}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a href="#enquiry" className="navbar-cta">Get a Quote</a>

        {/* Mobile hamburger */}
        <button
          className="navbar-hamburger"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile ${open ? 'open' : ''}`}>
        {navLinks.map(l => (
          <a key={l.label} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#enquiry" onClick={() => setOpen(false)} style={{ color: 'var(--blue-light)', fontWeight: 700 }}>
          🚀 Get a Quote
        </a>
      </div>
    </nav>
  )
}
