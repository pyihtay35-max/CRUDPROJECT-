import express from "express";
import Student from "../models/Student.js";
import  upload  from "../middlewares/upload.js";

const router = express.Router();

router.post("/", upload.single("photo"), async (req, res) => {
  try {
    console.log(req.body, req.file);
    const student = new Student({
      ...req.body,
      photo: req.file ? req.file.filename : null,
    });
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const list = await Student.find();
  res.json(list);
});

router.put("/:id", upload.single("photo"), async (req, res) => {
  console.log(req.body, req.file);

  const update = {
    ...req.body,
  };
  if (req.file) update.photo = req.file.filename;

  const student = await Student.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });
  res.json(student);
});

router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
