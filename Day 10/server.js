// server.js - Full CRUD API with MongoDB v4+
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 3000;

// MongoDB settings
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'resumeData';

let db;
let projectsCollection;

// Middleware
app.use(express.json());

// Connect to MongoDB
async function connectToMongoDB() {
  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    console.log('✅ Connected successfully to MongoDB');
    db = client.db(dbName);
    projectsCollection = db.collection('projects');
    console.log(`📊 Using database: ${dbName}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
}

/* ----------------- CRUD Routes ----------------- */

//  CREATE: POST /api/projects
app.post('/api/projects', async (req, res) => {
  try {
    const newProject = req.body;

    if (!newProject.title) {
      return res.status(400).json({ success: false, error: 'Title is required' });
    }

    const result = await projectsCollection.insertOne(newProject);
    const insertedProject = await projectsCollection.findOne({ _id: result.insertedId });

    res.status(201).json({ success: true, data: insertedProject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

//  READ: GET /api/projects (all projects)
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await projectsCollection.find().toArray();
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

//  READ: GET /api/projects/:id (single project)
app.get('/api/projects/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const project = await projectsCollection.findOne({ _id: new ObjectId(id) });

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, error: 'Invalid project ID' });
  }
});

// UPDATE: PUT /api/projects/:id
app.put('/api/projects/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const result = await projectsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const updatedProject = await projectsCollection.findOne({ _id: new ObjectId(id) });

    res.json({ success: true, data: updatedProject });
  } catch (err) {
    res.status(400).json({ success: false, error: 'Invalid project ID' });
  }
});

//  DELETE: DELETE /api/projects/:id
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await projectsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    res.status(400).json({ success: false, error: 'Invalid project ID' });
  }
});

/* ----------------- Start Server ----------------- */
connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
