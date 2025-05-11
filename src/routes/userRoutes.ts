import express, { Request, Response } from 'express';
import User from '../models/user';

const router = express.Router();

/**
 * ✅ Type Annotations + Inference
 * We explicitly annotate req and res as Request and Response.
 * We could also infer the return type, but being explicit helps clarity.
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    // ✅ Type Inference: TS knows req.body is any, but we could add a custom interface for strong typing
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Error creating user', details: err });
  }
});

/**
 * ✅ Function Declaration
 * Arrow function used with async/await to return all users.
 * TypeScript infers _req as Request (we can type it if we want).
 */
router.get('/', async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

export default router;
