import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// PATCH /tasks/:id — update status, assignee, or dueDate
router.patch('/:id', async (req, res) => {
  try {
    const allowedUpdates = ['status', 'assignee', 'dueDate', 'notes', 'title', 'type', 'role'];
    const updates = {};

    // Only pick allowed fields from request body
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });

    res.json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /tasks/:id — delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

export default router;
