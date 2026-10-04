import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

const STATUS_CLASSES = {
  New: 'new',
  Contacted: 'contacted',
  'In Progress': 'progress',
  Completed: 'completed',
}

const PKG_CLASSES = {
  Basic: 'basic',
  Standard: 'standard',
  Premium: 'premium',
}

function fmt(dt) {
  if (!dt) return '—'
  return new Date(dt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)
  const [exporting, setExporting] = useState(false)

  const fetchEnquiries = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/enquiries')
      if (!res.ok) throw new Error('Server error')
      const data = await res.json()
      setEnquiries(data)
    } catch {
      setError('Cannot connect to backend server. Make sure node server.js is running.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEnquiries()
  }, [fetchEnquiries])

  async function handleStatusChange(id, newStatus) {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error()
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      )
    } catch {
      alert('Failed to update status. Please try again.')
    }
  }

  async function handleDelete(id) {
    if (!window.confirm(`Are you sure you want to delete Enquiry #${id}? This cannot be undone.`)) return
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setEnquiries((prev) => prev.filter((e) => e.id !== id))
      if (selected?.id === id) setSelected(null)
    } catch {
      alert('Failed to delete enquiry. Please try again.')
    }
  }

  async function handleExport() {
    setExporting(true)
    try {
      const res = await fetch('/api/enquiries/export')
      if (!res.ok) throw new Error()
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'AR-Tech-Solutions-Enquiries.xlsx'
      a.click()
      URL.revokeObjectURL(url)
    } catch {
      alert('Export to Excel failed. Make sure backend is running.')
    } finally {
      setExporting(false)
    }
  }

  const filtered = enquiries.filter((e) =>
    [e.name, e.phone, e.email, e.service, e.package, e.project_type, e.status]
      .some((v) => (v || '').toLowerCase().includes(search.toLowerCase()))
  )

  const total = enquiries.length
  const newCount = enquiries.filter((e) => e.status === 'New').length
  const progressCount = enquiries.filter((e) => e.status === 'In Progress' || e.status === 'Contacted').length
  const completedCount = enquiries.filter((e) => e.status === 'Completed').length

  return (
    <div className="admin-page">
      {/* Top Header */}
      <div className="admin-header">
        <div className="admin-header-logo">
          <div className="logo-icon" style={{ width: 34, height: 34, fontSize: '0.9rem', borderRadius: 8 }}>
            AR
          </div>
          <div>
            AR Tech Solutions &bull; Admin Portal
            <span style={{ display: 'block', fontSize: '0.72rem', color: '#94a3b8', fontWeight: 500 }}>
              Lead Management &amp; Notification Monitor
            </span>
          </div>
        </div>

        <div className="admin-header-actions">
          <Link to="/" className="admin-home-link">
            &larr; View Public Site
          </Link>
          <button className="admin-refresh" onClick={fetchEnquiries} title="Refresh Enquiries">
            🔄 Refresh
          </button>
          <button className="admin-export" onClick={handleExport} disabled={exporting}>
            {exporting ? '⏳ Exporting...' : '📥 Export to Excel (.xlsx)'}
          </button>
        </div>
      </div>

      <div className="admin-content">
        {/* Summary Metric Cards */}
        <div className="admin-summary">
          <div className="admin-stat total">
            <h4>Total Received</h4>
            <div className="stat-num">{total}</div>
          </div>
          <div className="admin-stat new-stat">
            <h4>New &bull; Action Required</h4>
            <div className="stat-num">{newCount}</div>
          </div>
          <div className="admin-stat progress">
            <h4>In Progress / Contacted</h4>
            <div className="stat-num">{progressCount}</div>
          </div>
          <div className="admin-stat completed">
            <h4>Completed &bull; Delivered</h4>
            <div className="stat-num">{completedCount}</div>
          </div>
        </div>

        {/* Enquiries Card Table */}
        <div className="admin-card">
          <div className="admin-card-top">
            <div>
              <h3>All Client Enquiries ({filtered.length})</h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b' }}>
                All leads stored in SQLite database. Real-time status update &amp; Excel download.
              </p>
            </div>
            <input
              className="admin-search"
              placeholder="Search by name, phone, service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="admin-message">⏳ Fetching enquiries from database...</div>
          ) : error ? (
            <div className="admin-message" style={{ color: '#dc2626' }}>⚠️ {error}</div>
          ) : filtered.length === 0 ? (
            <div className="admin-message">
              {search ? `No enquiries matched "${search}"` : 'No enquiries found in database. Submit one from the website to test.'}
            </div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Client Name</th>
                    <th>Mobile Phone</th>
                    <th>Service</th>
                    <th>Package</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Quick Contact</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e) => (
                    <tr key={e.id}>
                      <td style={{ fontWeight: 800, color: '#2563eb' }}>#{e.id}</td>
                      <td>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{e.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{e.email}</div>
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        <a href={`tel:${e.phone}`} style={{ color: '#0f172a' }}>{e.phone}</a>
                      </td>
                      <td style={{ maxWidth: 160 }}>
                        <div style={{ fontSize: '0.86rem', fontWeight: 500 }}>{e.service || '—'}</div>
                      </td>
                      <td>
                        <span className={`package-badge ${PKG_CLASSES[e.package?.split(' ')[0]] || ''}`}>
                          {e.package || 'Custom'}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.84rem', color: e.due_date ? '#b91c1c' : '#64748b', fontWeight: 600 }}>
                          {e.due_date || 'Flexible'}
                        </span>
                      </td>
                      <td>
                        <select
                          className="status-select"
                          value={e.status}
                          onChange={(ev) => handleStatusChange(e.id, ev.target.value)}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td>
                        <a
                          href={`https://wa.me/91${e.phone?.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(e.name)},%20this%20is%20AR%20Tech%20Solutions%20regarding%20your%20enquiry%20#${e.id}.`}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: '#ecfdf5',
                            color: '#059669',
                            border: '1px solid #a7f3d0',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                          }}
                        >
                          💬 WhatsApp
                        </a>
                      </td>
                      <td style={{ whiteSpace: 'nowrap' }}>
                        <button className="view-button" onClick={() => setSelected(e)}>
                          👁 Details
                        </button>
                        <button className="delete-button" onClick={() => handleDelete(e.id)}>
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* View Detail Modal */}
      {selected && (
        <div className="admin-overlay" onClick={() => setSelected(null)}>
          <div className="enquiry-modal" onClick={(ev) => ev.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ margin: 0 }}>Enquiry #{selected.id} Details</h3>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Client: {selected.name}</span>
              </div>
              <button className="close-button" onClick={() => setSelected(null)}>✕</button>
            </div>

            <div className="details-grid">
              <div className="detail-item"><label>Full Name</label><p>{selected.name}</p></div>
              <div className="detail-item"><label>Primary Phone</label><p><a href={`tel:${selected.phone}`}>{selected.phone}</a></p></div>
              <div className="detail-item"><label>WhatsApp Number</label><p>{selected.whatsapp || selected.phone}</p></div>
              <div className="detail-item"><label>Email Address</label><p><a href={`mailto:${selected.email}`}>{selected.email}</a></p></div>
              <div className="detail-item"><label>Service</label><p>{selected.service || '—'}</p></div>
              <div className="detail-item"><label>Package</label><p>{selected.package || '—'}</p></div>
              <div className="detail-item"><label>Pages / Screens</label><p>{selected.pages || '—'}</p></div>
              <div className="detail-item"><label>Technology</label><p>{selected.technology || '—'}</p></div>
              <div className="detail-item"><label>Project Type</label><p>{selected.project_type || '—'}</p></div>
              <div className="detail-item"><label>Required Due Date</label><p>{selected.due_date || '—'}</p></div>
              <div className="detail-item"><label>Budget Range</label><p>{selected.budget || '—'}</p></div>
              <div className="detail-item">
                <label>Current Status</label>
                <p>
                  <span className={`status-badge ${STATUS_CLASSES[selected.status] || 'new'}`}>
                    {selected.status}
                  </span>
                </p>
              </div>
              <div className="detail-item detail-wide"><label>Required Features</label><p>{selected.features || 'None specified'}</p></div>
              <div className="detail-item detail-wide">
                <label>Detailed Requirements / Notes</label>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px 16px', fontSize: '0.9rem', color: '#1e293b', whiteSpace: 'pre-wrap' }}>
                  {selected.requirements || 'No additional requirements entered.'}
                </div>
              </div>
              <div className="detail-item detail-wide"><label>Submission Timestamp</label><p>{fmt(selected.created_at)}</p></div>
            </div>

            <div className="modal-footer" style={{ gap: '10px' }}>
              <a
                href={`https://wa.me/91${selected.phone?.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(selected.name)},%20this%20is%20AR%20Tech%20Solutions%20regarding%20your%20enquiry%20#${selected.id}.`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#059669',
                  color: '#ffffff',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}
              >
                💬 Open WhatsApp Chat
              </a>
              <button className="close-modal-button" onClick={() => setSelected(null)}>
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
