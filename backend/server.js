require("dotenv").config();                      // Load .env FIRST
const express    = require("express");
const cors       = require("cors");
const sqlite3    = require("sqlite3").verbose();
const XLSX       = require("xlsx");
const { notifyAdmins, buildWaText, admins } = require("./notifications");

const app = express();
app.use(cors());
app.use(express.json());

/*
========================================
DATABASE — SQLite with Migration
========================================
*/
const db = new sqlite3.Database("./artechsolutions.db", (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to SQLite database (artechsolutions.db)");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS enquiries (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    name         TEXT NOT NULL,
    phone        TEXT,
    whatsapp     TEXT,
    email        TEXT,
    service      TEXT,
    package      TEXT,
    pages        TEXT,
    features     TEXT,
    technology   TEXT,
    project_type TEXT,
    due_date     TEXT,
    budget       TEXT,
    requirements TEXT,
    status       TEXT DEFAULT 'New',
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

/*
========================================
HOME HEALTH CHECK
========================================
*/
app.get("/", (req, res) => {
  res.json({
    status:  "online",
    company: "AR Tech Solutions",
    version: "4.0",
    adminsConfigured: admins.length,
    endpoints: {
      enquiries: "/api/enquiries",
      export:    "/api/enquiries/export",
    }
  });
});

/*
========================================
POST /api/enquiries — Submit Enquiry
1. Validates required fields
2. Permanently stores in SQLite
3. Dispatches SMS + WhatsApp + Email alerts to BOTH admins
4. Returns enquiryId & direct instant WhatsApp alert links
========================================
*/
app.post("/api/enquiries", (req, res) => {
  const {
    name, phone, whatsapp, email, service,
    package: packageName, pages, features,
    technology, project_type, due_date, budget, requirements,
  } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({ message: "Name, phone and email are required." });
  }

  const sql = `
    INSERT INTO enquiries
      (name, phone, whatsapp, email, service, package, pages,
       features, technology, project_type, due_date, budget, requirements)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name, phone, whatsapp, email, service, packageName,
    pages, features, technology, project_type, due_date, budget, requirements,
  ];

  db.run(sql, values, function (err) {
    if (err) {
      console.error("DB Error:", err.message);
      return res.status(500).json({ message: "Failed to save enquiry." });
    }

    const enquiryId = this.lastID;

    const enquiry = {
      id: enquiryId, name, phone, whatsapp, email,
      service, package: packageName, pages, features,
      technology, project_type, due_date, budget, requirements,
    };

    const waText = buildWaText(enquiry);
    const encodedWaText = encodeURIComponent(waText);

    // Direct WhatsApp URLs for 2 Admins
    const waLinks = {
      admin1: {
        name: admins[0].name,
        phone: admins[0].rawPhone,
        url: `https://api.whatsapp.com/send?phone=91${admins[0].rawPhone}&text=${encodedWaText}`,
      },
      admin2: {
        name: admins[1].name,
        phone: admins[1].rawPhone,
        url: `https://api.whatsapp.com/send?phone=91${admins[1].rawPhone}&text=${encodedWaText}`,
      },
    };

    // Respond immediately with ID & Links
    res.status(201).json({
      message: "Enquiry submitted successfully.",
      enquiryId,
      waLinks,
      urgentAlertText: `🚨 URGENT: New enquiry #${enquiryId} from ${name} (${phone}) for ${service || 'Project'}.`,
    });

    // Trigger background automated dispatch (SMS + WhatsApp Bot + Gmail)
    notifyAdmins(enquiry).catch((e) =>
      console.error("Notification dispatch error:", e.message)
    );
  });
});

/*
========================================
GET /api/enquiries — All Enquiries for Admin
========================================
*/
app.get("/api/enquiries", (req, res) => {
  db.all("SELECT * FROM enquiries ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ message: "Failed to fetch enquiries." });
    res.json(rows);
  });
});

/*
========================================
PUT /api/enquiries/:id — Update Status
Allowed: 'New', 'Contacted', 'In Progress', 'Completed'
========================================
*/
app.put("/api/enquiries/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const allowed = ["New", "Contacted", "In Progress", "Completed"];

  if (!allowed.includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  db.run("UPDATE enquiries SET status = ? WHERE id = ?", [status, id], function (err) {
    if (err) return res.status(500).json({ message: "Failed to update status." });
    if (this.changes === 0) return res.status(404).json({ message: "Enquiry not found." });
    res.json({ message: "Status updated successfully.", status });
  });
});

/*
========================================
DELETE /api/enquiries/:id — Delete Enquiry
========================================
*/
app.delete("/api/enquiries/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM enquiries WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ message: "Failed to delete enquiry." });
    if (this.changes === 0) return res.status(404).json({ message: "Enquiry not found." });
    res.json({ message: "Enquiry deleted successfully." });
  });
});

/*
========================================
GET /api/enquiries/export — Real .xlsx Excel Download
========================================
*/
app.get("/api/enquiries/export", (req, res) => {
  db.all("SELECT * FROM enquiries ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ message: "Export failed." });

    const data = rows.map((r) => ({
      "Enquiry ID":    r.id,
      "Client Name":   r.name,
      "Phone":         r.phone,
      "WhatsApp":      r.whatsapp || r.phone,
      "Email":         r.email,
      "Service":       r.service || "—",
      "Package":       r.package || "—",
      "Pages":         r.pages || "—",
      "Features":      r.features || "—",
      "Technology":    r.technology || "—",
      "Project Type":  r.project_type || "—",
      "Due Date":      r.due_date || "—",
      "Budget":        r.budget || "—",
      "Requirements":  r.requirements || "—",
      "Status":        r.status,
      "Created Date":  r.created_at,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "AR Tech Enquiries");
    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Disposition", 'attachment; filename="AR-Tech-Solutions-Enquiries.xlsx"');
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(buffer);
  });
});

/*
========================================
SERVER START
========================================
*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("==========================================================");
  console.log("  🏢 AR TECH SOLUTIONS BACKEND SERVER v4.0");
  console.log("==========================================================");
  console.log(`  🌐 API Base     : http://localhost:${PORT}`);
  console.log(`  📋 Enquiries API: http://localhost:${PORT}/api/enquiries`);
  console.log(`  📥 Excel Export : http://localhost:${PORT}/api/enquiries/export`);
  console.log("----------------------------------------------------------");
  console.log(`  👥 Admin 1: ${admins[0].name} (Ph: ${admins[0].rawPhone}, ${admins[0].email})`);
  console.log(`  👥 Admin 2: ${admins[1].name} (Ph: ${admins[1].rawPhone}, ${admins[1].email})`);
  console.log("==========================================================");
});