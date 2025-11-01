import { Task } from "@/domain/entities/task";

export interface TasksRepository {
  findById(id: string): Promise<Task | null>;
  create(taskProps: Task): Promise<Task>;
  updateTaskStatus(id: string, status: "PENDING" | "COMPLETED"): Promise<Task>;
  delete(id: string): Promise<void>;
  save(task: Task): Promise<void>;
}
