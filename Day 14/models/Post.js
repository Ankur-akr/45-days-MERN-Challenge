const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true, maxlength: 200 },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  categories: [String],
  tags: [String],
  published: { type: Boolean, default: false },
  publishedAt: Date,
  views: { type: Number, default: 0 }
}, { timestamps: true });

postSchema.pre('validate', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title.toLowerCase().trim().replace(/\s+/g,'-').replace(/[^\w\-]+/g,'').slice(0,200);
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);
