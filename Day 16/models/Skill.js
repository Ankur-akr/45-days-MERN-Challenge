const mongoose = require('mongoose');
const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  level: { type: String, enum: ['beginner','intermediate','advanced','expert'], default: 'intermediate' }
});
module.exports = mongoose.model('Skill', skillSchema);