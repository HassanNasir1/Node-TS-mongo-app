import Task, { ITask } from '../models/tasks';
import { TaskStatus } from '../types/tasks';

/**
 * ✅ Class to handle task-related operations
 */
export class TaskService {
  /**
   * ✅ Static method to update task status
   */
  static async updateStatus(taskId: string, newStatus: TaskStatus): Promise<ITask | null> {
    const task = await Task.findById(taskId);
    if (!task) return null;

    task.status = newStatus;
    task.logs.push([newStatus, new Date()]); // ✅ Tuple usage
    await task.save();
    return task;
  }

  /**
   * ✅ Generic function example: filter tasks by status
   */
  static async filterByStatus<T extends TaskStatus>(status: T): Promise<ITask[]> {
    return Task.find({ status });
  }
}
