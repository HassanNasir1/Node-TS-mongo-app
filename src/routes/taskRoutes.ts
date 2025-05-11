import express, { Request, Response } from 'express';
import Task from '../models/tasks';
import { TaskService } from '../services/TaskService';
import { TaskStatus } from '../types/tasks';

const router = express.Router();

router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create task', details: err });
  }
});

// router.patch('/:taskId/status', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
//   try {
//     const { taskId } = req.params;
//     const { newStatus } = req.body;

//     const updated = await TaskService.updateStatus(taskId, newStatus);
//     if (!updated) return res.status(404).json({ error: 'Task not found' });

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: 'Update failed', details: err });
//   }
// });

router.get('/stats/status', async (_: express.Request, res: express.Response) => {
  try {
    const stats = await Task.getStatusStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Stats failed', details: err });
  }
});

export default router;
