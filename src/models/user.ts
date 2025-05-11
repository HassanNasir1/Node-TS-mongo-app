import mongoose, { Schema, Document } from 'mongoose';

/**
 * ✅ Enums
 * UserRole is a string enum that restricts roles to "admin" or "user"
 * Enums help keep your code clean and reduce magic strings.
 */
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}


/**
 * ✅ Interfaces
 * We define a User interface (IUser) that extends Mongoose's Document.
 * This gives us strong typing for the model and better IntelliSense.
 */
export interface IUser extends Document {
  name: string;
  email: string;
  role: UserRole; // ✅ Using the enum here ensures role is one of the enum values
}

/**
 * ✅ Type Annotations
 * We annotate the schema variable with Schema<IUser> so TypeScript knows
 * this schema will return IUser-typed documents.
 */
const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: Object.values(UserRole), // ✅ Enum validation
      default: UserRole.USER,
    },
  },
  { timestamps: true } // Mongoose will add createdAt and updatedAt
);

// Export the model typed with IUser interface
export default mongoose.model<IUser>('User', userSchema);
