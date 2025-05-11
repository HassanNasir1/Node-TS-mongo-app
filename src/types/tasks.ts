/**
 * ✅ Enum for Task status
 */
export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
  }
  
  /**
   * ✅ Tuple type for status history entries
   * [status, date]
   */
  export type StatusLog = [TaskStatus, Date];
  