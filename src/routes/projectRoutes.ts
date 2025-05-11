import express, { Request, Response } from 'express';
import Project from '../models/project';
import { Types } from 'mongoose';

const router = express.Router();

/**
 * ✅ Create a Project
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: 'Error creating project', details: error });
  }
});

/**
 * ✅ Get all Projects by a specific owner (user)
 * Demonstrates use of static method
 */
router.get('/owner/:ownerId', async (req: Request, res: Response) => {

  try {
    const ownerId = new Types.ObjectId(req.params.ownerId);
    const projects = await Project.findByOwner(ownerId); // ✅ Static member usage
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects', details: error });
  }
});

export default router;
