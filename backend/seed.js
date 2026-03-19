import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Patient from './models/Patient.js';
import Task from './models/Task.js';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/dialysis';

async function seed() {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Patient.deleteMany({});
    await Task.deleteMany({});

    // 1. Create Patients
    const patients = await Patient.insertMany([
      { name: 'John Doe', age: 45, ward: 'A1', bloodGroup: 'O+', contactNumber: '1234567890' },
      { name: 'Jane Smith', age: 38, ward: 'B2', bloodGroup: 'A-', contactNumber: '9876543210' },
      { name: 'Robert Brown', age: 60, ward: 'C3', bloodGroup: 'B+', contactNumber: '4567890123' },
    ]);

    console.log(`Seeded ${patients.length} patients.`);

    // 2. Create Tasks for Patient 1
    const p1 = patients[0];
    await Task.insertMany([
      {
        patientId: p1._id,
        title: 'Check Blood Pressure',
        type: 'lab',
        status: 'in_progress',
        role: 'nurse',
        assignee: 'Alice',
        dueDate: new Date(),
        notes: 'Check carefully after treatment.',
      },
      {
        patientId: p1._id,
        title: 'Review Diet Plan',
        type: 'diet_counselling',
        status: 'overdue',
        role: 'dietician',
        assignee: 'Bob',
        dueDate: new Date(Date.now() - 86400000), // yesterday
      },
    ]);

    console.log('Seeded tasks for John Doe.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
