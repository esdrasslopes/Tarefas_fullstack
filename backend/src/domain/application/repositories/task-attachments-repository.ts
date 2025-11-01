import type { TaskAttachment } from "@/domain/entities/task-attachment";

export interface TaskAttachmentsRepository {
  createMany(attachments: TaskAttachment[]): Promise<void>;
  deleteMany(attachments: TaskAttachment[]): Promise<void>;
  findManyByTaskId(taskId: string): Promise<TaskAttachment[]>;
  deleteManyByTaskId(taskId: string): Promise<void>;
}
