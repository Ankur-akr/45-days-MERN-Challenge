const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Technology' }],
  startDate: Date,
  endDate: Date,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  public: { type: Boolean, default: true }
}, { timestamps: true });
module.exports = mongoose.model('Project', projectSchema);