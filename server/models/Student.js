import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: Number, required: true, unique: true },
  grade: { type: String, required: true },
  phone: String,
  photo: String, // uploaded image path
});

export default mongoose.model("Student", studentSchema);
