import mongoose, { Schema, Document, Types, Model } from 'mongoose';

/**
 * ✅ Base structure for reuse (Type Alias)
 */
type ProjectBase = {
  name: string;
  description: string;
  owner: Types.ObjectId;
};

/**
 * ✅ Interface for instance methods (each document)
 */
export interface IProject extends Document, ProjectBase {}

/**
 * ✅ Interface for static methods on the model
 */
interface IProjectModel extends Model<IProject> {
  findByOwner(ownerId: Types.ObjectId): Promise<IProject[]>;
}

/**
 * ✅ Define schema
 */
const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

/**
 * ✅ Define static method
 */
projectSchema.statics.findByOwner = function (
  ownerId: Types.ObjectId
): Promise<IProject[]> {
  return this.find({ owner: ownerId });
};

/**
 * ✅ Export model with correct type (IProjectModel)
 */
const Project = mongoose.model<IProject, IProjectModel>('Project', projectSchema);
export default Project;
