const express = require('express');
const mongoose = require('mongoose');
const workExperienceRoutes = require('./routes/workExperience');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = 3000;
const mongoUrl = 'mongodb://localhost:27017/resumeData';

app.use(express.json());
app.use('/api/work-experience', workExperienceRoutes);
app.use(errorHandler);

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ DB Connection Error:', err.message));
