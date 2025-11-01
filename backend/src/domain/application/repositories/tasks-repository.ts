import type { Optional } from "@/core/types/optional";
import { Task, type TaskProps } from "@/domain/entities/task";

export interface TasksRepository {
  findById(id: string): Promise<Task | null>;
  create(
    taskProps: Optional<TaskProps, "id" | "createdAt" | "completedAt">
  ): Promise<Task>;
  updateTaskStatus(id: string, status: "PENDING" | "COMPLETED"): Promise<Task>;
}
