const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
  content: { type: String, required: true, trim: true, maxlength: 2000 },
  approved: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
