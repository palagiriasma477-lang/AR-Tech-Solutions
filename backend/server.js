require("dotenv").config();
const express    = require("express");
const cors       = require("cors");
const mongoose   = require("mongoose");
const sqlite3    = require("sqlite3").verbose();
const XLSX       = require("xlsx");
const Enquiry    = require("./models/Enquiry");
const { notifyAdmins, buildWaText, admins } = require("./notifications");

const app = express();
app.use(cors());
app.use(express.json());

/*
======================================================
1. MONGODB CONNECTION (MERN Stack)
======================================================
*/
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/artechsolutions";
let isMongoConnected = false;

mongoose
  .connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 })
  .then(() => {
    isMongoConnected = true;
    console.log("🍃 [MongoDB] Connected successfully to MERN database:", MONGODB_URI);
  })
  .catch((err) => {
    console.log(`ℹ️  [MongoDB] Local/Atlas server not detected (${err.message}). Dual SQLite storage active.`);
  });

/*
======================================================
2. SQLITE DATABASE (Dual Backup & Persistence)
======================================================
*/
const db = new sqlite3.Database("./artechsolutions.db", (err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("💾 [SQLite] Connected to local persistent database (artechsolutions.db)");
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
======================================================
HEALTH CHECK
======================================================
*/
app.get("/", (req, res) => {
  res.json({
    status: "online",
    stack: "MERN (React + Node.js + Express + MongoDB)",
    database: {
      mongoConnected: isMongoConnected,
      sqliteBackup: "active",
    },
    company: "AR Tech Solutions",
    admins: admins.map((a) => ({ name: a.name, phone: a.rawPhone, email: a.email })),
  });
});

/*
======================================================
POST /api/enquiries — Submit Enquiry
- Saves into MongoDB & SQLite
- Dispatches SMS, WhatsApp, and Email alerts to both Admins
- Returns Reference ID & Direct WhatsApp Delivery URLs
======================================================
*/
app.post("/api/enquiries", async (req, res) => {
  const {
    name, phone, whatsapp, email, service,
    package: packageName, pages, features,
    technology, project_type, due_date, budget, requirements,
  } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({ message: "Name, phone and email are required." });
  }

  let mongoId = null;

  // 1. Save to MongoDB if connected
  if (isMongoConnected) {
    try {
      const newEnquiry = new Enquiry({
        name, phone, whatsapp, email, service,
        package: packageName, pages, features,
        technology, project_type, due_date, budget, requirements,
      });
      const saved = await newEnquiry.save();
      mongoId = saved._id;
      console.log(`🍃 [MongoDB] Saved new enquiry #${mongoId}`);
    } catch (err) {
      console.error("MongoDB Save Error:", err.message);
    }
  }

  // 2. Save to SQLite for persistence
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
      console.error("SQLite Error:", err.message);
      return res.status(500).json({ message: "Failed to store enquiry." });
    }

    const sqliteId = this.lastID;
    const enquiryId = mongoId ? `${mongoId}` : `${sqliteId}`;

    const enquiry = {
      id: enquiryId,
      name, phone, whatsapp, email,
      service, package: packageName, pages, features,
      technology, project_type, due_date, budget, requirements,
    };

    const waText = buildWaText(enquiry);
    const encodedWaText = encodeURIComponent(waText);

    // Direct WhatsApp Links for Both Admins
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
      message: "Enquiry submitted and stored in database successfully.",
      enquiryId: sqliteId,
      mongoId: mongoId,
      waLinks,
      urgentAlertText: `🚨 URGENT: New Enquiry #${sqliteId} from ${name} (${phone}) for ${service || 'Project'}.`,
    });

    // Background multi-channel notification dispatch
    notifyAdmins(enquiry).catch((e) =>
      console.error("Notification dispatch error:", e.message)
    );
  });
});

/*
======================================================
GET /api/enquiries — Fetch All Enquiries
======================================================
*/
app.get("/api/enquiries", async (req, res) => {
  if (isMongoConnected) {
    try {
      const records = await Enquiry.find().sort({ created_at: -1 });
      const mapped = records.map((r) => ({
        id: r._id,
        name: r.name,
        phone: r.phone,
        whatsapp: r.whatsapp,
        email: r.email,
        service: r.service,
        package: r.package,
        pages: r.pages,
        features: r.features,
        technology: r.technology,
        project_type: r.project_type,
        due_date: r.due_date,
        budget: r.budget,
        requirements: r.requirements,
        status: r.status,
        created_at: r.created_at,
      }));
      return res.json(mapped);
    } catch (err) {
      console.error("MongoDB fetch error, falling back to SQLite:", err.message);
    }
  }

  db.all("SELECT * FROM enquiries ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ message: "Failed to fetch enquiries." });
    res.json(rows);
  });
});

/*
======================================================
PUT /api/enquiries/:id — Update Status
======================================================
*/
app.put("/api/enquiries/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const allowed = ["New", "Contacted", "In Progress", "Completed"];

  if (!allowed.includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  if (isMongoConnected && mongoose.Types.ObjectId.isValid(id)) {
    try {
      await Enquiry.findByIdAndUpdate(id, { status });
    } catch (err) {
      console.error("MongoDB status update error:", err.message);
    }
  }

  db.run("UPDATE enquiries SET status = ? WHERE id = ?", [status, id], function (err) {
    if (err) return res.status(500).json({ message: "Failed to update status." });
    res.json({ message: "Status updated successfully.", status });
  });
});

/*
======================================================
DELETE /api/enquiries/:id — Delete Enquiry
======================================================
*/
app.delete("/api/enquiries/:id", async (req, res) => {
  const { id } = req.params;

  if (isMongoConnected && mongoose.Types.ObjectId.isValid(id)) {
    try {
      await Enquiry.findByIdAndDelete(id);
    } catch (err) {
      console.error("MongoDB delete error:", err.message);
    }
  }

  db.run("DELETE FROM enquiries WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ message: "Failed to delete enquiry." });
    res.json({ message: "Enquiry deleted successfully." });
  });
});

/*
======================================================
GET /api/enquiries/export — Real Excel .xlsx Export
======================================================
*/
app.get("/api/enquiries/export", (req, res) => {
  db.all("SELECT * FROM enquiries ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ message: "Export failed." });

    const data = rows.map((r) => ({
      "Enquiry ID":   r.id,
      "Client Name":  r.name,
      "Phone":        r.phone,
      "WhatsApp":     r.whatsapp || r.phone,
      "Email":        r.email,
      "Service":      r.service || "—",
      "Package":      r.package || "—",
      "Pages":        r.pages || "—",
      "Features":     r.features || "—",
      "Technology":   r.technology || "—",
      "Project Type": r.project_type || "—",
      "Due Date":     r.due_date || "—",
      "Budget":       r.budget || "—",
      "Requirements": r.requirements || "—",
      "Status":       r.status,
      "Created Date": r.created_at,
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
======================================================
SERVER START
======================================================
*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("==========================================================");
  console.log("  🏢 AR TECH SOLUTIONS FULL-STACK SERVER (MERN v5.0)");
  console.log("==========================================================");
  console.log(`  🌐 API Base     : http://localhost:${PORT}`);
  console.log(`  📋 Enquiries API: http://localhost:${PORT}/api/enquiries`);
  console.log(`  📥 Excel Export : http://localhost:${PORT}/api/enquiries/export`);
  console.log("----------------------------------------------------------");
  console.log(`  👥 Admin 1: ${admins[0].name} (+${admins[0].rawPhone})`);
  console.log(`  👥 Admin 2: ${admins[1].name} (+${admins[1].rawPhone})`);
  console.log("==========================================================");
});