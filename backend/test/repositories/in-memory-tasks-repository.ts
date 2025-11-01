import type { Optional } from "@/core/types/optional";
import type { TasksRepository } from "@/domain/application/repositories/tasks-repository";
import { Task, type TaskProps } from "@/domain/entities/task";
import { randomUUID } from "crypto";

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = [];

  async create(
    taskProps: Optional<TaskProps, "id" | "createdAt" | "completedAt">
  ) {
    const task = Task.create({
      ...taskProps,
      id: randomUUID(),
      createdAt: new Date(),
    });

    this.items.push(task);

    return task;
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.items.find((item) => item.id === id);

    if (!task) {
      return null;
    }

    return task;
  }
}
