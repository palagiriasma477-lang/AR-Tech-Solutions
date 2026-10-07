const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name:         { type: String, required: true },
    phone:        { type: String, required: true },
    whatsapp:     { type: String },
    email:        { type: String, required: true },
    service:      { type: String },
    package:      { type: String },
    pages:        { type: String },
    features:     { type: String },
    technology:   { type: String },
    project_type: { type: String },
    due_date:     { type: String },
    budget:       { type: String },
    requirements: { type: String },
    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Completed"],
      default: "New",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
