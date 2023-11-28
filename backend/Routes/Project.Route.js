const express = require("express");
const ProjectRouter = express.Router();
const { ProjectModal } = require("../Model/Project.Modal");
const { UploadModal } = require("../Model/Upload.Modal");

ProjectRouter.get("/all", async (req, res) => {
  const { user } = req.query;
  try {
    let projects = await ProjectModal.find({}).lean(true);
    let data = projects;
    if (user) {
      data = data.filter((project) => project.email.toLowerCase() === user.toLowerCase());
    }

    if (data?.length) {
      for (const project of data) {
        const count = await UploadModal.countDocuments({ projectId: project._id });
        project.count = count;
      }
    }

    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

ProjectRouter.get("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  try {
    let project = await ProjectModal.findById(projectId).lean(true);
    const count = await UploadModal.countDocuments({ projectId: project._id });
    project.count = count;
    res.status(200).send(project);
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

ProjectRouter.post("/", async (req, res) => {
  try {
    const project = new ProjectModal(req.body);
    await project.save();
    res.status(200).send({ msg: "New Project Added Successfully" });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

ProjectRouter.patch("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  try {
    await ProjectModal.findByIdAndUpdate(projectId, req.body);
    res.status(200).send({ msg: `The Project Updated Successfully` });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

ProjectRouter.delete("/:projectId", async (req, res) => {
  const { projectId } = req.params;
  try {
    await ProjectModal.findByIdAndDelete(projectId);
    await UploadModal.deleteMany({ projectId });
    res.status(200).send({ msg: `The Project deleted Successfully` });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

module.exports = { ProjectRouter };
