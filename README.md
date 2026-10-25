# 🚀 AR Tech Solutions — Enterprise IT & Academic Engineering Platform

[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![SQLite3](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

> A production-grade, full-stack software platform built for **commercial startups, businesses, and academic engineering students**. Features modern responsive web architecture, interactive live simulations, real-time client lead ingestion with dual WhatsApp & SMS dispatch, and a comprehensive admin analytics suite.

---

## 🌟 Key Highlights & Engineering Features

### 🖥️ Modern Commercial Client Experience
- **Interactive Engineering Lab Simulation**: Live animated code-typing and ECE oscilloscope workbench built in pure SVG & CSS.
- **Interactive Code Inspector**: In-browser terminal drawer showcasing production architecture (TypeScript, Python, YAML, SQL) for all core services.
- **Dynamic Project Scope Configurator**: Real-time project cost and turnaround estimator with interactive scope pills and instant WhatsApp quotation.
- **High-Converting Responsive Architecture**: Zero layout shift, modern dark luxury glassmorphism, fluid typography, and sub-second load times.

### 🛡️ Secure Admin Portal & Business Analytics (`/admin`)
- **Real-Time Client Lead Ingestion**: Stores client submissions persistently in SQLite database with status workflows (`New`, `Contacted`, `In Progress`, `Completed`).
- **Visitor Traffic Analytics**: Multi-timeframe monitoring tracking visitor volume over **24h**, **2–3 days**, **1 week**, and **1 month** with device categorization.
- **One-Click Excel Spreadsheet Export**: Generates `.xlsx` reports dynamically using SheetJS (`xlsx`) for offline record keeping.
- **Dual Administrator WhatsApp Notifications**: Instantly alerts admins (`P. Asma` & `K. Reddy Basha`) upon client form submission with complete scope parameters.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies Used | Key Purpose |
|:---|:---|:---|
| **Frontend UI** | React 19, Vite, React Router v6 | High-performance SPA with code-splitting & client routing |
| **Styling & Animation** | Modern CSS3, CSS Grid, Glassmorphism, SVG Keyframes | 60FPS hardware-accelerated animations & responsive layout |
| **Backend API** | Node.js, Express.js, CORS | RESTful API endpoints for enquiries, analytics tracking & export |
| **Database** | SQLite3 (`artechsolutions.db`) | Lightweight, self-contained relational database with automated schema migration |
| **Reporting & Export** | SheetJS (`xlsx`) | Binary workbook compilation for instant `.xlsx` downloads |
| **Notification Engine** | WhatsApp API links, Nodemailer, Fast2SMS | Automated real-time alerts dispatched to administrators |

---

## 📂 System Architecture & File Structure

```text
AR-Tech-Solutions/
├── backend/
│   ├── server.js               # Express REST API, SQLite initialization & analytics endpoints
│   ├── notifications.js        # Multi-channel notification dispatcher (WhatsApp, SMS, Email)
│   ├── artechsolutions.db      # Persistent SQLite database file
│   ├── package.json            # Backend dependencies
│   └── .env.example            # Environment configuration template
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx                  # Fixed glassmorphic navigation bar with mobile drawer
│   │   │   ├── Hero.jsx                    # Staggered 3D floating cards with commercial positioning
│   │   │   ├── Services.jsx                # 9 core services with expandable live code terminals
│   │   │   ├── EngineeringLabAnimation.jsx # Live interactive developer & ECE oscilloscope simulation
│   │   │   ├── MarqueeTicker.jsx           # Seamless continuous tech stack marquee
│   │   │   ├── Packages.jsx                # Interactive Academic vs Commercial pricing tiers
│   │   │   ├── ProjectEstimator.jsx        # Live scope & timeline configurator
│   │   │   ├── Process.jsx                 # 8-step connected circuit pipeline
│   │   │   ├── Portfolio.jsx               # High-tech browser mockup frames with tech badges
│   │   │   ├── TrustStrip.jsx              # 4-pillar engineering assurance cards
│   │   │   ├── EnquiryForm.jsx             # 13-field validated form + dual-admin WhatsApp trigger
│   │   │   ├── AdminDashboard.jsx          # Analytics KPIs, search filters, and Excel export
│   │   │   ├── Contact.jsx                 # Direct communication channels & Google Maps
│   │   │   └── Footer.jsx                  # Corporate footer with discrete admin entry point
│   │   ├── App.jsx                         # Main routing configuration
│   │   ├── App.css                         # Custom dark glassmorphic stylesheet
│   │   └── index.css                       # Global design tokens, typography & CSS variables
│   ├── vite.config.js                      # Vite build configuration with backend proxy
│   └── package.json                        # Frontend dependencies
└── README.md                               # Project documentation
```

---

## 🚀 Quick Setup & Local Execution

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/palagiriasma477-lang/AR-Tech-Solutions.git
cd AR-Tech-Solutions
```

### 2. Setup Backend Server
```bash
cd backend
npm install
node server.js
```
*Backend runs on `http://localhost:5000` and creates `artechsolutions.db` automatically.*

### 3. Setup Frontend Client
In a new terminal:
```bash
cd frontend
npm install
npm run dev -- --host
```
*Frontend runs on `http://localhost:5173` with proxy routing to port 5000.*

---

## 🔗 Useful Endpoints & Routes

- **Public Web Application**: `http://localhost:5173/`
- **Admin Dashboard**: `http://localhost:5173/admin`
- **Enquiry Submission API**: `POST http://localhost:5000/api/enquiries`
- **Analytics Track API**: `POST http://localhost:5000/api/analytics/track`
- **Analytics Metrics API**: `GET http://localhost:5000/api/analytics/stats`
- **Excel Export**: `GET http://localhost:5000/api/enquiries/export`

---

## 👩‍💻 Author & Developer

**Asma Palagiri**
- **GitHub**: [@palagiriasma477-lang](https://github.com/palagiriasma477-lang)
- **Email**: [palagiriasma477@gmail.com](mailto:palagiriasma477@gmail.com)
- **Location**: Kadapa & Rayachoti, Andhra Pradesh, India

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
