import { useState, useEffect } from 'react'

export default function EngineeringLabAnimation() {
  const [activeTab, setActiveTab] = useState('both')
  const [codeLineIdx, setCodeLineIdx] = useState(0)
  const [sensorVal, setSensorVal] = useState(26.4)
  const [packetCount, setPacketCount] = useState(142)

  // Simulation timer for live code typing & sensor telemetry
  useEffect(() => {
    const codeTimer = setInterval(() => {
      setCodeLineIdx((prev) => (prev + 1) % 6)
      setPacketCount((p) => p + 1)
    }, 2400)

    const sensorTimer = setInterval(() => {
      setSensorVal((v) => Number((25.5 + Math.random() * 3.2).toFixed(1)))
    }, 1800)

    return () => {
      clearInterval(codeTimer)
      clearInterval(sensorTimer)
    }
  }, [])

  const codeSnippets = [
    'import { useState, useEffect } from "react";',
    'const [dataset, setDataset] = useState(null);',
    'const model = await tf.loadLayersModel("/ai-core");',
    'const prediction = model.predict(sensorInputs);',
    'res.status(200).json({ status: "VERIFIED", latency: "14ms" });',
    'console.log("✓ All 24 Unit Tests Passed • Zero Bugs");',
  ]

  return (
    <section className="section-dark lab-section" id="lab">
      <div className="container">
        <div className="text-center">
          <span className="section-badge-dark">
            ⚡ LIVE ENGINEERING WORKBENCH
          </span>
          <h2 className="section-title-dark">Watch Our Developers &amp; ECE Engineers Build Live</h2>
          <p className="section-sub-dark">
            From software algorithms and web apps to embedded hardware, IoT microcontrollers and IEEE documentation —
            see how our specialists engineer real-world systems simultaneously.
          </p>

          {/* Interactive Workstation Toggles */}
          <div className="lab-tabs">
            <button
              className={`lab-tab-btn ${activeTab === 'both' ? 'active' : ''}`}
              onClick={() => setActiveTab('both')}
            >
              🔄 Both Workstations
            </button>
            <button
              className={`lab-tab-btn ${activeTab === 'cse' ? 'active' : ''}`}
              onClick={() => setActiveTab('cse')}
            >
              💻 Station 1: Software &amp; AI Developer
            </button>
            <button
              className={`lab-tab-btn ${activeTab === 'ece' ? 'active' : ''}`}
              onClick={() => setActiveTab('ece')}
            >
              ⚡ Station 2: ECE &amp; Embedded Hardware Engineer
            </button>
          </div>
        </div>

        {/* Dual Workstations Container */}
        <div className="lab-grid">
          
          {/* ━━━━━━━━ WORKSTATION 1: SOFTWARE DEVELOPER ━━━━━━━━ */}
          {(activeTab === 'both' || activeTab === 'cse') && (
            <div className="workstation-card workstation-cse">
              <div className="workstation-header">
                <div className="station-title">
                  <span className="station-avatar">👨‍💻</span>
                  <div>
                    <h4>Software &amp; AI Engineering Desk</h4>
                    <span className="station-lead">Developer: Full-Stack &amp; ML Architecture</span>
                  </div>
                </div>
                <div className="live-status-pill">
                  <span className="status-dot-green"></span>
                  LIVE CODING
                </div>
              </div>

              {/* Visual Animated Developer Desk */}
              <div className="desk-visual desk-cse-visual">
                <div className="dev-character">
                  <div className="dev-head">
                    <div className="dev-headset"></div>
                  </div>
                  <div className="dev-body">
                    <div className="dev-hands typing-hands"></div>
                  </div>
                  <div className="dev-chair"></div>
                </div>

                {/* Dual Screen Setup */}
                <div className="screen-setup">
                  <div className="screen-monitor screen-left">
                    <div className="screen-header-bar">
                      <span className="screen-dot red"></span>
                      <span className="screen-dot yellow"></span>
                      <span className="screen-dot green"></span>
                      <span className="screen-title-text">App.jsx — React v19</span>
                    </div>
                    <div className="screen-ide-body">
                      <div className="code-line num">1 <span className="kwd">import</span> React <span className="kwd">from</span> &apos;react&apos;;</div>
                      <div className="code-line num">2 <span className="kwd">const</span> App = () =&gt; &#123;</div>
                      <div className="code-line num active-code">
                        3 &nbsp;&nbsp;<span className="fn">{codeSnippets[codeLineIdx]}</span>
                        <span className="cursor-blink">|</span>
                      </div>
                      <div className="code-line num">4 &nbsp;&nbsp;<span className="kwd">return</span> &lt;<span className="tag">Dashboard</span> /&gt;;</div>
                      <div className="code-line num">5 &#125;; <span className="kwd">export default</span> App;</div>
                    </div>
                  </div>

                  <div className="screen-monitor screen-right">
                    <div className="screen-header-bar">
                      <span className="screen-title-text">terminal: bash</span>
                    </div>
                    <div className="screen-terminal-body">
                      <div className="term-line success">✓ [200 OK] GET /api/telemetry</div>
                      <div className="term-line info">🍃 Connected to MongoDB &amp; SQLite</div>
                      <div className="term-line warn">⚡ Packets: {packetCount} stream active</div>
                      <div className="term-line active">
                        $ npm test --passWithNoTests
                        <span className="term-blink">_</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Station Metrics Footer */}
              <div className="station-metrics">
                <div className="st-metric">
                  <span className="st-label">Active Stack</span>
                  <strong>React • Node • Python AI</strong>
                </div>
                <div className="st-metric">
                  <span className="st-label">Build Health</span>
                  <strong style={{ color: '#10b981' }}>100% Passing ✓</strong>
                </div>
                <div className="st-metric">
                  <span className="st-label">Deliverable</span>
                  <strong>Unlocked Source Code</strong>
                </div>
              </div>
            </div>
          )}

          {/* ━━━━━━━━ WORKSTATION 2: ECE HARDWARE ENGINEER ━━━━━━━━ */}
          {(activeTab === 'both' || activeTab === 'ece') && (
            <div className="workstation-card workstation-ece">
              <div className="workstation-header">
                <div className="station-title">
                  <span className="station-avatar">⚡</span>
                  <div>
                    <h4>ECE &amp; Embedded IoT Workbench</h4>
                    <span className="station-lead">Engineer: Hardware Circuits &amp; Microcontrollers</span>
                  </div>
                </div>
                <div className="live-status-pill status-amber">
                  <span className="status-dot-amber"></span>
                  CIRCUIT TESTING
                </div>
              </div>

              {/* Visual Animated ECE Hardware Bench */}
              <div className="desk-visual desk-ece-visual">
                <div className="dev-character ece-char">
                  <div className="dev-head ece-head">
                    <div className="ece-goggles"></div>
                  </div>
                  <div className="dev-body">
                    <div className="dev-hands soldering-hand"></div>
                  </div>
                  <div className="dev-chair"></div>
                </div>

                {/* Hardware Workbench & Oscilloscope */}
                <div className="bench-setup">
                  {/* Microcontroller & Breadboard */}
                  <div className="breadboard-box">
                    <div className="mcu-chip">
                      <span className="chip-label">ESP32-WROOM</span>
                      <div className="mcu-leds">
                        <span className="mcu-led led-pwr"></span>
                        <span className="mcu-led led-tx pulsing-led"></span>
                        <span className="mcu-led led-rx pulsing-led"></span>
                      </div>
                    </div>
                    <div className="jumper-wires">
                      <div className="wire wire-red"></div>
                      <div className="wire wire-blue"></div>
                      <div className="wire wire-green"></div>
                    </div>
                    <div className="sensor-module">
                      <span className="sensor-name">DHT11 SENSOR</span>
                      <div className="sensor-telemetry">{sensorVal}&deg;C</div>
                    </div>
                  </div>

                  {/* Oscilloscope Waveform Display */}
                  <div className="oscilloscope-box">
                    <div className="scope-header">
                      <span>DSO 100MHz OSCILLOSCOPE</span>
                      <span className="scope-freq">50.0 Hz</span>
                    </div>
                    <div className="scope-grid">
                      <svg className="scope-wave-svg" viewBox="0 0 200 60" preserveAspectRatio="none">
                        <path
                          className="scope-wave-path"
                          d="M 0,30 Q 25,5 50,30 T 100,30 T 150,30 T 200,30"
                        />
                      </svg>
                    </div>
                    <div className="scope-footer">
                      <span>CH1: 3.3V PWM</span>
                      <span style={{ color: '#10b981' }}>TRIGGER: LOCKED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Station Metrics Footer */}
              <div className="station-metrics">
                <div className="st-metric">
                  <span className="st-label">Hardware Controller</span>
                  <strong>ESP32 • Arduino • IoT</strong>
                </div>
                <div className="st-metric">
                  <span className="st-label">Live Telemetry</span>
                  <strong style={{ color: '#38bdf8' }}>{sensorVal}&deg;C • 3.3V Logic</strong>
                </div>
                <div className="st-metric">
                  <span className="st-label">Deliverable</span>
                  <strong>Complete Schematic &amp; Code</strong>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Live Lab Sync Ribbon */}
        <div className="lab-sync-banner">
          <div className="sync-pulse-dot"></div>
          <div>
            <strong>Seamless CSE &amp; ECE Project Integration:</strong> Hardware sensor feeds stream directly into Web/Mobile dashboards with complete IEEE documentation, presentation slides, and 1-on-1 viva guidance.
          </div>
          <a href="#enquiry" className="btn btn-sm btn-primary" style={{ marginLeft: 'auto', whiteSpace: 'nowrap' }}>
            Book Your Engineering Project &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}
