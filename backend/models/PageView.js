const mongoose = require("mongoose");

const PageViewSchema = new mongoose.Schema({
  ip: { type: String, default: "anonymous" },
  page: { type: String, default: "/" },
  user_agent: { type: String, default: "" },
  device: { type: String, default: "Desktop" },
  referrer: { type: String, default: "" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PageView", PageViewSchema);
