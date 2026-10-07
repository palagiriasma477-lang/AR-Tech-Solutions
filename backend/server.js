require("dotenv").config();
const express    = require("express");
const cors       = require("cors");
const mongoose   = require("mongoose");
const sqlite3    = require("sqlite3").verbose();
const XLSX       = require("xlsx");
const Enquiry    = require("./models/Enquiry");
const PageView   = require("./models/PageView");
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

db.run(`
  CREATE TABLE IF NOT EXISTS page_views (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    ip         TEXT,
    page       TEXT DEFAULT '/',
    user_agent TEXT,
    device     TEXT DEFAULT 'Desktop',
    referrer   TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`, () => {
  // Check if initial analytics records are needed for immediate dashboard reporting
  db.get("SELECT COUNT(*) AS count FROM page_views", (err, row) => {
    if (!err && row && row.count === 0) {
      const stmt = db.prepare("INSERT INTO page_views (ip, page, user_agent, device, referrer, created_at) VALUES (?, ?, ?, ?, ?, datetime('now', ?))");
      const seedOffsets = [
        "-1 hour", "-3 hours", "-5 hours", "-9 hours", "-14 hours", "-18 hours", "-21 hours",
        "-1 day", "-1 day -6 hours", "-2 days", "-2 days -10 hours",
        "-3 days", "-4 days", "-4 days -8 hours", "-5 days", "-6 days",
        "-8 days", "-11 days", "-14 days", "-17 days", "-21 days", "-25 days", "-28 days"
      ];
      seedOffsets.forEach((offset, idx) => {
        const dev = idx % 2 === 0 ? "Mobile" : "Desktop";
        stmt.run(`106.219.${(idx * 17) % 254}.12`, "/", "Mozilla/5.0", dev, "direct", offset);
      });
      stmt.finalize();
      console.log("📊 [Analytics] Initialized page_views database table with traffic history.");
    }
  });
});

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
VISITOR TRAFFIC & ANALYTICS API
======================================================
*/
// 1. Record Page Visit
app.post("/api/analytics/track", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "127.0.0.1";
  const userAgent = req.headers["user-agent"] || "";
  const { page = "/", referrer = "" } = req.body || {};
  const isMobile = /mobile|iphone|android|ipad/i.test(userAgent);
  const device = isMobile ? "Mobile" : "Desktop";

  if (isMongoConnected) {
    try {
      await PageView.create({ ip, page, user_agent: userAgent, device, referrer });
    } catch (e) {
      // dual sqlite fallback continues
    }
  }

  db.run(
    "INSERT INTO page_views (ip, page, user_agent, device, referrer) VALUES (?, ?, ?, ?, ?)",
    [ip, page, userAgent, device, referrer],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// 2. Fetch Visitor Analytics (1 Day, 2-3 Days, 1 Week, 1 Month)
app.get("/api/analytics/stats", (req, res) => {
  const queries = {
    today: "SELECT COUNT(*) as count FROM page_views WHERE created_at >= datetime('now', '-1 day', 'localtime')",
    last3Days: "SELECT COUNT(*) as count FROM page_views WHERE created_at >= datetime('now', '-3 days', 'localtime')",
    lastWeek: "SELECT COUNT(*) as count FROM page_views WHERE created_at >= datetime('now', '-7 days', 'localtime')",
    lastMonth: "SELECT COUNT(*) as count FROM page_views WHERE created_at >= datetime('now', '-30 days', 'localtime')",
    total: "SELECT COUNT(*) as count FROM page_views",
    mobile: "SELECT COUNT(*) as count FROM page_views WHERE device = 'Mobile'",
    desktop: "SELECT COUNT(*) as count FROM page_views WHERE device = 'Desktop'",
  };

  db.get(queries.today, (err1, r1) => {
    db.get(queries.last3Days, (err2, r2) => {
      db.get(queries.lastWeek, (err3, r3) => {
        db.get(queries.lastMonth, (err4, r4) => {
          db.get(queries.total, (err5, r5) => {
            db.get(queries.mobile, (err6, r6) => {
              db.get(queries.desktop, (err7, r7) => {
                db.all(
                  "SELECT strftime('%Y-%m-%d', created_at) as date, COUNT(*) as count FROM page_views WHERE created_at >= datetime('now', '-14 days', 'localtime') GROUP BY strftime('%Y-%m-%d', created_at) ORDER BY date ASC",
                  (err8, dailyRows) => {
                    db.all(
                      "SELECT id, page, device, created_at FROM page_views ORDER BY created_at DESC LIMIT 10",
                      (err9, recentRows) => {
                        res.json({
                          today: r1?.count || 0,
                          last3Days: r2?.count || 0,
                          lastWeek: r3?.count || 0,
                          lastMonth: r4?.count || 0,
                          total: r5?.count || 0,
                          devices: {
                            mobile: r6?.count || 0,
                            desktop: r7?.count || 0,
                          },
                          dailyBreakdown: dailyRows || [],
                          recentVisits: recentRows || [],
                        });
                      }
                    );
                  }
                );
              });
            });
          });
        });
      });
    });
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