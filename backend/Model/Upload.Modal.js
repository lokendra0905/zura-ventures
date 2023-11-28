const mongoose = require("mongoose");
const UploadSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    link: { type: String, required: true },
    status: { type: String, default: "done" },
    platform: { type: String, required: true },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: true,
      index: true,
    },
  },
  {
    versionKey: false,
  }
);

const UploadModal = mongoose.model("upload", UploadSchema);

module.exports = {
  UploadModal,
};
