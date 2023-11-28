const express = require("express");
const cors = require("cors");
const { connection } = require("./connection");
const { ProjectRouter } = require("./Routes/Project.Route");
const { UploadRouter } = require("./Routes/Upload.Route");

const app = express();

require("dotenv").config;

app.use(cors());

app.get("/", async (req, res) => {
  try {
    res.status(200).send("Welcome to LAMA");
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

app.use(express.json());
app.use("/uploads", UploadRouter);
app.use("/project", ProjectRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to Database Successfully running on 8080");
  } catch (error) {
    console.log("Cannot Connect to Datatbase");
  }
});
