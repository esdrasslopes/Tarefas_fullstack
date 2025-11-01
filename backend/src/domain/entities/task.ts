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

  set status(newStatus: "PENDING" | "COMPLETED") {
    this.props.status = newStatus;
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

  set completedAt(date: Date | undefined | null) {
    this.completedAt = date;
  }

  get id() {
    return this.props.id;
  }

  private update() {
    this.completedAt = new Date();
  }

  static create(props: TaskProps) {
    const task = new Task({
      ...props,
    });

    return task;
  }
}
