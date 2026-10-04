# AR Tech Solutions — Full-Stack Platform

A complete, sales-focused, modern IT company website and academic project engineering platform for **AR Tech Solutions** (Kadapa & Rayachoti, Andhra Pradesh).

---

## 🚀 Live Access Links

- **🌐 Public Website (Local)**: `http://localhost:5173/`
- **🛡️ Admin Dashboard (Local)**: `http://localhost:5173/admin`
- **⚙️ Backend API Base**: `http://localhost:5000/`
- **🌍 Active Public Sharing Link**: `https://thin-peas-pay.loca.lt`
  *(Enter your public IP or click continue if prompted by localtunnel)*

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology | Responsibilities |
|---|---|---|
| **Frontend** | React 19 + Vite | Responsive sales-focused UI, Enquiry Form, Routing, Admin Portal |
| **Styling** | Custom Pure CSS | Deep slate corporate palette, modern typography, card hover elevation |
| **Backend** | Node.js + Express | REST API, validation, SQLite storage, Excel export, notification dispatch |
| **Database** | SQLite3 (`artechsolutions.db`) | Permanent storage of all submitted client enquiries & status updates |
| **Spreadsheets** | SheetJS (`xlsx`) | On-demand `.xlsx` Excel workbook generation and download |
| **Alerts** | Fast2SMS / WhatsApp / Nodemailer | Urgent SMS text messages, WhatsApp plain-text alerts & Gmail HTML notification |

---

## 📂 Project Structure

```text
AR-Tech-Solutions/
├── backend/
│   ├── server.js               # Express API endpoints & SQLite initialization
│   ├── notifications.js        # Multi-channel alert dispatcher (SMS, WhatsApp, Gmail)
│   ├── artechsolutions.db      # SQLite persistent database file
│   ├── package.json            # Backend dependencies (express, sqlite3, xlsx, axios, nodemailer)
│   ├── .env                    # Private credentials & Admin contact details (gitignored)
│   └── .env.example            # Configuration template
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Header with logo, navigation & quote CTA
│   │   │   ├── Hero.jsx            # Value proposition, live preview card & stats
│   │   │   ├── Services.jsx        # 9 Core IT services (Website, Apps, Software, Cloud, etc.)
│   │   │   ├── Academic.jsx        # Student & final-year engineering project categories
│   │   │   ├── CustomBanner.jsx    # 100% custom blueprint assurance banner
│   │   │   ├── WhyUs.jsx           # 9 competitive advantages
│   │   │   ├── Packages.jsx        # Basic, Standard (Most Popular) & Premium tiers
│   │   │   ├── Process.jsx         # 8-step structured delivery methodology
│   │   │   ├── Portfolio.jsx       # 6 showcased projects with tech stack chips
│   │   │   ├── Reviews.jsx         # Verified student & client testimonials
│   │   │   ├── EnquiryForm.jsx     # 13-field validated form + 1-tap WhatsApp alert dispatch
│   │   │   ├── Contact.jsx         # 7 Direct contact channels + Kadapa & Rayachoti map links
│   │   │   ├── Footer.jsx          # Clean corporate footer with copyright & links
│   │   │   └── AdminDashboard.jsx  # KPI metrics, search, status management, Excel export
│   │   ├── App.jsx             # React Router (/ for public site, /admin for dashboard)
│   │   ├── App.css             # Section-by-section responsive styles
│   │   ├── index.css           # Plus Jakarta Sans + Inter design system variables
│   │   └── main.jsx            # React root mount
│   ├── vite.config.js          # Vite config with backend proxy (/api -> :5000)
│   └── package.json            # React & Vite packages
└── README.md                   # Complete master documentation
```

---

## 🏃 Quick Start (Local Development)

Run the application using **two terminals**:

### Terminal 1: Backend Server
```bash
cd backend
node server.js
```
*Runs on port 5000 and connects to `artechsolutions.db`.*

### Terminal 2: Frontend Client
```bash
cd frontend
npm run dev -- --host
```
*Runs on port 5173 with proxy to backend.*

---

## 🔔 Setting Up Real Notifications (SMS, WhatsApp & Email)

Edit `backend/.env` with your preferred credentials:

### 1. 📧 Email Notifications (Gmail)
1. Visit [Google Account Security](https://myaccount.google.com/security)
2. Ensure **2-Step Verification** is turned ON.
3. Open **App Passwords** &rarr; select "Mail" &rarr; click **Generate**.
4. Copy the 16-character password and update:
   ```env
   EMAIL_USER=palagiriasma477@gmail.com
   EMAIL_PASS=your_16_character_app_password
   ```

### 2. 💬 WhatsApp Bot Notifications (CallMeBot Free)
1. **Admin 1 (9390011965)**: Send WhatsApp message `I allow callmebot to send me messages` to `+34 644 65 21 69`.
2. **Admin 2 (9515139866)**: Send the same message from phone 9515139866 to `+34 644 65 21 69`.
3. You will immediately receive an API Key in reply.
4. Update `backend/.env`:
   ```env
   ADMIN1_WA_APIKEY=received_api_key_1
   ADMIN2_WA_APIKEY=received_api_key_2
   ```

### 3. 📱 Cellular Urgent SMS Text Alert (Fast2SMS)
1. Sign up for free at [Fast2SMS](https://www.fast2sms.com/).
2. Copy your API Key from the **Dev API** tab.
3. Update `backend/.env`:
   ```env
   FAST2SMS_API_KEY=your_fast2sms_api_key
   ```

*(Note: Even without external API keys, the frontend Enquiry Form provides **instant 1-tap WhatsApp alert dispatch** directly to both administrators upon submission!)*

---

## 📊 Admin Dashboard Features (`/admin`)

- **KPI Metric Cards**: Total Leads, New Unaddressed Enquiries, In-Progress, and Completed.
- **Real-Time Search**: Filter enquiries instantly by client name, mobile phone, service, or status.
- **Inline Status Management**: Change status between `New`, `Contacted`, `In Progress`, and `Completed`.
- **Full View Modal**: Inspect all 13 submitted fields including custom syllabus requirements.
- **Real Excel Export**: Single-click download of `AR-Tech-Solutions-Enquiries.xlsx`.
- **Direct Client WhatsApp Chat**: Reach out to the client in one click with pre-filled greeting.
