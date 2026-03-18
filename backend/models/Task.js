import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: [true, 'Patient ID is required'],
    },
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['lab', 'access_check', 'diet_counselling', 'vaccination', 'social_work', 'other'],
      default: 'other',
    },
    status: {
      type: String,
      enum: ['overdue', 'in_progress', 'completed'],
      default: 'in_progress',
    },
    role: {
      type: String,
      enum: ['nurse', 'dietician', 'social_worker'],
      required: [true, 'Role is required'],
    },
    assignee: {
      type: String,
      trim: true,
      default: 'Unassigned',
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Task', TaskSchema);
