import mongoose from 'mongoose';

const WorkExperienceSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  isCurrent: { type: Boolean, default: false },
  location: { type: String },
  description: { type: String },
  technologies: [String]
}, { timestamps: true });

const Work = mongoose.model('Work', WorkExperienceSchema);
export default Work;