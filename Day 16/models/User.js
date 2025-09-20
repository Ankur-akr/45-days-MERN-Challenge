const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  bio: String,
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  experience: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }]
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);