/*
  ============================================================
  notifications.js — AR Tech Solutions v4
  Handles 3 Channels for BOTH Admins:
  1. 📱 SMS: Urgent Text Message Alert (Fast2SMS / Console Logger)
  2. 💬 WhatsApp: Plain Text Notification (CallMeBot API + Direct Links)
  3. 📧 Email: Rich HTML + Plain Text Email (Gmail SMTP / Nodemailer)
  ============================================================
*/

const nodemailer = require("nodemailer");
const axios      = require("axios");

/* ── 2 Administrators Configuration ──────────────────────── */
const admins = [
  {
    id:       1,
    name:     process.env.ADMIN1_NAME     || "P. Asma",
    phone:    process.env.ADMIN1_PHONE    || "919390011965",
    rawPhone: "9390011965",
    email:    process.env.ADMIN1_EMAIL    || "palagiriasma477@gmail.com",
    waApiKey: process.env.ADMIN1_WA_APIKEY || "",
  },
  {
    id:       2,
    name:     process.env.ADMIN2_NAME     || "K Reddy Basha",
    phone:    process.env.ADMIN2_PHONE    || "919515139866",
    rawPhone: "9515139866",
    email:    process.env.ADMIN2_EMAIL    || "kamanurubasha@gmail.com",
    waApiKey: process.env.ADMIN2_WA_APIKEY || "",
  },
];

/* ── WhatsApp Plain Text Formatter ───────────────────────── */
function buildWaText(e) {
  return [
    "🚨 *URGENT ALERT: NEW ENQUIRY RECEIVED* 🚨",
    "🏢 *AR TECH SOLUTIONS*",
    "──────────────────────────",
    `🆔 *Enquiry ID* : #${e.id}`,
    `👤 *Client Name*: ${e.name}`,
    `📞 *Phone*      : ${e.phone}`,
    `💬 *WhatsApp*   : ${e.whatsapp || "Same as phone"}`,
    `📧 *Email*      : ${e.email}`,
    `🛠 *Service*    : ${e.service || "General Inquiry"}`,
    `📦 *Package*    : ${e.package || "Custom"}`,
    `📄 *Pages*      : ${e.pages || "N/A"}`,
    `💻 *Tech Stack* : ${e.technology || "Flexible"}`,
    `🎓 *Proj Type*  : ${e.project_type || "N/A"}`,
    `📅 *Target Date*: ${e.due_date || "Immediate"}`,
    `💰 *Budget*     : ${e.budget || "Flexible"}`,
    `✨ *Features*   : ${e.features || "None specified"}`,
    "──────────────────────────",
    "📋 *Client Requirements*:",
    `${e.requirements || "No specific details provided."}`,
    "──────────────────────────",
    `⏰ *Submitted*   : ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
    "👉 *Admin Portal*: http://localhost:5173/admin",
    "⚠️ *ACTION REQUIRED: Please contact the client immediately.*",
  ].join("\n");
}

/* ── Urgent SMS Text Message Formatter ───────────────────── */
function buildSmsText(e) {
  return `🚨 [URGENT] AR Tech Solutions: New Enquiry #${e.id} from ${e.name} (Ph: ${e.phone}) for ${e.service || 'Project'}. Due: ${e.due_date || 'ASAP'}. Check Admin portal immediately.`;
}

/* ── Email HTML Formatter ────────────────────────────────── */
function buildEmailHtml(e, adminName) {
  const row = (label, value) => `
    <tr>
      <td style="padding:10px 14px;font-size:13px;color:#64748b;font-weight:600;width:34%;border-bottom:1px solid #e2e8f0;background:#f8fafc;">${label}</td>
      <td style="padding:10px 14px;font-size:14px;color:#0f172a;font-weight:500;border-bottom:1px solid #e2e8f0;">${value || "—"}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:24px;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,0.08);border:1px solid #e2e8f0;">
    
    <!-- Top Urgent Banner -->
    <div style="background:#dc2626;padding:10px 24px;text-align:center;">
      <span style="color:#ffffff;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;">
        ⚠️ URGENT ACTION REQUIRED — NEW CLIENT ENQUIRY
      </span>
    </div>

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0a1628,#0f2744);padding:28px 32px;border-bottom:3px solid #2563eb;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
        <span style="background:linear-gradient(135deg,#2563eb,#38bdf8);color:#fff;padding:6px 12px;border-radius:8px;font-weight:900;font-size:15px;letter-spacing:-0.5px;">AR</span>
        <span style="color:#ffffff;font-size:19px;font-weight:800;letter-spacing:-0.3px;">AR Tech Solutions</span>
      </div>
      <h1 style="color:#ffffff;font-size:22px;margin:12px 0 4px;font-weight:700;">New Project Enquiry Received</h1>
      <p style="color:#94a3b8;font-size:13px;margin:0;">Ref: Enquiry #${e.id} &bull; ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
    </div>

    <!-- Content -->
    <div style="padding:28px 32px;">
      <p style="font-size:14px;color:#334155;line-height:1.6;margin-top:0;">
        Hello <strong>${adminName}</strong>,<br>
        A client has just submitted a new enquiry through the AR Tech Solutions website. Please review the specifications below and initiate follow-up.
      </p>

      <div style="margin:20px 0;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
        <table style="width:100%;border-collapse:collapse;text-align:left;">
          ${row("👤 Client Name", e.name)}
          ${row("📞 Mobile Phone", `<a href="tel:${e.phone}" style="color:#2563eb;text-decoration:none;font-weight:700;">${e.phone}</a>`)}
          ${row("💬 WhatsApp", e.whatsapp ? `<a href="https://wa.me/91${e.whatsapp.replace(/\D/g,'')}" style="color:#059669;text-decoration:none;font-weight:700;">${e.whatsapp}</a>` : "Same as phone")}
          ${row("📧 Email Address", `<a href="mailto:${e.email}" style="color:#2563eb;text-decoration:none;">${e.email}</a>`)}
          ${row("🛠 Service Requested", `<strong>${e.service || "General"}</strong>`)}
          ${row("📦 Selected Package", e.package || "Custom Package")}
          ${row("📄 Page Count", e.pages)}
          ${row("💻 Technology", e.technology)}
          ${row("🎓 Project Category", e.project_type)}
          ${row("📅 Required Delivery", `<span style="color:#dc2626;font-weight:700;">${e.due_date || "Urgent / ASAP"}</span>`)}
          ${row("💰 Expected Budget", e.budget)}
          ${row("✨ Key Features", e.features)}
        </table>
      </div>

      ${e.requirements ? `
      <div style="margin:24px 0;">
        <div style="font-size:12px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">
          Client Detailed Notes / Requirements:
        </div>
        <div style="background:#f8fafc;border-left:4px solid #2563eb;padding:14px 18px;border-radius:0 8px 8px 0;font-size:14px;color:#1e293b;line-height:1.6;white-space:pre-wrap;">${e.requirements}</div>
      </div>` : ""}

      <!-- Quick Action Buttons -->
      <div style="margin:30px 0 10px;text-align:center;">
        <a href="http://localhost:5173/admin" style="display:inline-block;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#ffffff;padding:13px 32px;border-radius:50px;text-decoration:none;font-size:14px;font-weight:700;box-shadow:0 4px 14px rgba(37,99,235,0.3);margin-right:8px;">
          📊 Open Admin Dashboard
        </a>
        <a href="https://wa.me/91${e.phone.replace(/\D/g,'')}?text=Hello%20${encodeURIComponent(e.name)},%20thank%20you%20for%20contacting%20AR%20Tech%20Solutions.%20Regarding%20your%20enquiry%20#${e.id}..." style="display:inline-block;background:#059669;color:#ffffff;padding:13px 26px;border-radius:50px;text-decoration:none;font-size:14px;font-weight:700;box-shadow:0 4px 14px rgba(5,150,105,0.3);">
          💬 WhatsApp Client
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f8fafc;padding:18px 32px;border-top:1px solid #e2e8f0;text-align:center;">
      <p style="margin:0;font-size:12px;color:#94a3b8;">
        Automated secure notification from AR Tech Solutions Backend Server.<br>
        Admin contact data is protected and never shown in public client code.
      </p>
    </div>

  </div>
</body>
</html>`;
}

/* ── 1. SEND URGENT SMS TEXT MESSAGE ─────────────────────── */
async function sendSmsNotification(enquiry) {
  const smsText = buildSmsText(enquiry);
  const targetNumbers = admins.map(a => a.rawPhone).join(",");

  console.log(`\n📱 [SMS ALERT DISPATCH]`);
  console.log(`   Recipients: ${targetNumbers}`);
  console.log(`   Message   : "${smsText}"`);

  // Check Fast2SMS API Key
  const fast2smsKey = process.env.FAST2SMS_API_KEY;
  if (fast2smsKey && !fast2smsKey.includes("your_")) {
    try {
      const response = await axios.post(
        "https://www.fast2sms.com/dev/bulkV2",
        {
          route:     "q",
          message:   smsText,
          language:  "english",
          flash:     0,
          numbers:   targetNumbers,
        },
        {
          headers: { authorization: fast2smsKey },
          timeout: 10000,
        }
      );
      console.log(`   ✅ Fast2SMS Response:`, response.data?.message || "SMS Delivered successfully");
      return { success: true, method: "Fast2SMS" };
    } catch (err) {
      console.error(`   ❌ Fast2SMS Gateway Error:`, err.response?.data?.message || err.message);
    }
  } else {
    console.log(`   ℹ️ [SMS Simulation] Fast2SMS key not set in .env. To enable real instant cellular SMS, set FAST2SMS_API_KEY in backend/.env.`);
  }

  return { success: false, method: "Simulation" };
}

/* ── 2. SEND WHATSAPP NOTIFICATION ───────────────────────── */
async function sendWhatsAppNotification(admin, text) {
  const waKey = admin.waApiKey || process.env[`ADMIN${admin.id}_WA_APIKEY`];

  console.log(`💬 [WHATSAPP DISPATCH] Admin ${admin.name} (+${admin.phone})`);

  if (waKey && !waKey.includes("your_callmebot")) {
    try {
      const params = new URLSearchParams({
        phone:  `+${admin.phone}`,
        text:   text,
        apikey: waKey,
      });

      await axios.get(
        `https://api.callmebot.com/whatsapp.php?${params.toString()}`,
        { timeout: 12000 }
      );
      console.log(`   ✅ CallMeBot WhatsApp delivered to ${admin.name}`);
      return true;
    } catch (err) {
      console.error(`   ❌ CallMeBot Error for ${admin.name}:`, err.response?.data || err.message);
    }
  } else {
    console.log(`   ℹ️ Direct WhatsApp Link generated for ${admin.name}: https://wa.me/${admin.phone}?text=${encodeURIComponent(text.substring(0, 150))}...`);
  }

  return false;
}

/* ── 3. SEND EMAIL NOTIFICATION ──────────────────────────── */
async function sendEmailNotification(admin, enquiry) {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  console.log(`📧 [EMAIL DISPATCH] Admin ${admin.name} (${admin.email})`);

  if (emailUser && emailPass && !emailPass.includes("your_16_char")) {
    try {
      const transporter = nodemailer.createTransport({
        host:   "smtp.gmail.com",
        port:   587,
        secure: false,
        auth: {
          user: emailUser,
          pass: emailPass,
        },
        tls: { rejectUnauthorized: false },
      });

      await transporter.sendMail({
        from:    `"AR Tech Solutions Alerts" <${emailUser}>`,
        to:      admin.email,
        subject: `🚨 [URGENT] New Enquiry #${enquiry.id} - ${enquiry.name} (${enquiry.service || 'Project'})`,
        html:    buildEmailHtml(enquiry, admin.name),
        text:    buildWaText(enquiry),
      });

      console.log(`   ✅ Email delivered to ${admin.name} (${admin.email})`);
      return true;
    } catch (err) {
      console.error(`   ❌ Email SMTP Error for ${admin.name}:`, err.message);
    }
  } else {
    console.log(`   ℹ️ [Email Simulation] Gmail App Password not yet configured in .env. To enable, create a 16-character App Password at myaccount.google.com and set EMAIL_PASS in backend/.env.`);
  }

  return false;
}

/* ── MASTER DISPATCH: Notify BOTH Admins on all channels ─── */
async function notifyAdmins(enquiry) {
  console.log("\n========================================================");
  console.log(`🚨 [URGENT NEW ENQUIRY #${enquiry.id}] DISPATCHING NOTIFICATIONS`);
  console.log("========================================================");
  console.log(`Client  : ${enquiry.name} | Phone: ${enquiry.phone}`);
  console.log(`Service : ${enquiry.service} | Package: ${enquiry.package}`);
  console.log("--------------------------------------------------------");

  const waText = buildWaText(enquiry);

  // 1. Dispatch SMS text message alert
  await sendSmsNotification(enquiry);

  // 2. Dispatch WhatsApp + Email to BOTH Admins
  for (const admin of admins) {
    await sendWhatsAppNotification(admin, waText);
    await sendEmailNotification(admin, enquiry);
  }

  console.log("========================================================\n");
}

module.exports = {
  notifyAdmins,
  buildWaText,
  admins,
};
