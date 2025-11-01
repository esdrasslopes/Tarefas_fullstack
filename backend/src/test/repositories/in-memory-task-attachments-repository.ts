import type { TaskAttachmentsRepository } from "@/domain/application/repositories/task-attachments-repository";
import type { TaskAttachment } from "@/domain/entities/task-attachment";

export class InMemoryTaskAttachmentsRepository
  implements TaskAttachmentsRepository
{
  public items: TaskAttachment[] = [];

  async findManyByTaskId(taskId: string) {
    const taskAttachments = this.items.filter((item) => item.taskId === taskId);

    return taskAttachments;
  }

  async deleteManyByTaskId(taskId: string) {
    this.items = this.items.filter((item) => item.taskId !== taskId);
  }

  async createMany(attachments: TaskAttachment[]): Promise<void> {
    this.items.push(...attachments);
  }

  async deleteMany(attachments: TaskAttachment[]): Promise<void> {
    this.items = this.items.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item));
    });
  }
}
