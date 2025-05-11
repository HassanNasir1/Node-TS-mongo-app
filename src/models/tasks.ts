import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { TaskStatus, StatusLog } from '../types/tasks';

/**
 * ✅ Interface for base task fields
 */
interface TaskBase {
  title: string;
  description: string;
  projectId: Types.ObjectId;
  status: TaskStatus;
  logs: StatusLog[]; // ✅ Tuple array
}

/**
 * ✅ Interface for document
 */
export interface ITask extends Document, TaskBase {}

/**
 * ✅ Static method interface
 */
interface ITaskModel extends Model<ITask> {
  getStatusStats(): Promise<any>;
}

/**
 * ✅ Schema
 */
const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    description: String,
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    status: { type: String, enum: Object.values(TaskStatus), default: TaskStatus.TODO },
    logs: { type: [[String, Date]], default: [] }, // ✅ Tuple schema as array of [string, date]
  },
  { timestamps: true }
);

/**
 * ✅ Static aggregation example: count by status
 */
taskSchema.statics.getStatusStats = function () {
  return this.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
};

export default mongoose.model<ITask, ITaskModel>('Task', taskSchema);
