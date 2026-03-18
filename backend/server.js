import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import patientRoutes from './routes/patients.js';
import taskRoutes from './routes/tasks.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/patients', patientRoutes);
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Dialysis Care Plan API is running' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });