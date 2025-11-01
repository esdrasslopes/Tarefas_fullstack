import type { TaskAttachmentsRepository } from "@/domain/application/repositories/task-attachments-repository";
import type { TasksRepository } from "@/domain/application/repositories/tasks-repository";
import { Task } from "@/domain/entities/task";

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = [];

  constructor(private taskAttachmentRepository: TaskAttachmentsRepository) {}

  async create(task: Task) {
    this.items.push(task);

    await this.taskAttachmentRepository.createMany(task.attachments.getItems());

    return task;
  }

  async findById(id: string) {
    const task = this.items.find((item) => item.id === id);

    if (!task) {
      return null;
    }

    return task;
  }

  async updateTaskStatus(id: string, status: "PENDING" | "COMPLETED") {
    const task = this.items.find((item) => item.id === id);

    if (!task) {
      throw new Error();
    }

    task.status = status;

    this.items = this.items.map((item) => {
      if (item.id === id) {
        return task;
      }

      return item;
    });

    return task;
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    this.items.splice(itemIndex, 1);

    await this.taskAttachmentRepository.deleteManyByTaskId(id);
  }

  async save(task: Task) {
    const itemIndex = this.items.findIndex((item) => item.id === task.id);

    this.items[itemIndex] = task;

    await this.taskAttachmentRepository.createMany(
      task.attachments.getNewItems()
    );

    await this.taskAttachmentRepository.deleteMany(
      task.attachments.getRemovedItems()
    );
  }
}
