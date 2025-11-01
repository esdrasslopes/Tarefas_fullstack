import { Entity } from "@/core/entities/entity";

export interface TaskProps {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: "PENDING" | "COMPLETED";
  priority: "LOW" | "HIGH";
  createdAt: Date;
  completedAt?: Date | null;
}

export class Task extends Entity<TaskProps> {
  get projectId() {
    return this.props.projectId;
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get status() {
    return this.props.status;
  }

  get priority() {
    return this.props.priority;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get completedAt() {
    return this.props.completedAt;
  }

  get id() {
    return this.props.id;
  }

  static create(props: TaskProps) {
    const task = new Task({
      ...props,
    });

    return task;
  }
}
