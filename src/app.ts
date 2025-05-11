import express from "express";
import userRouter from "./routes/userRoutes";
import projectRoutes from './routes/projectRoutes';
import taskRoutes from './routes/taskRoutes';
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use("/api/users", userRouter);
app.use('/api/projects', projectRoutes);


export default app;