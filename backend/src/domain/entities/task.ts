import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Entity } from "../../core/entities/entity";

export interface TaskProps {
  projectId: UniqueEntityID;
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

  static create(props: TaskProps, id: UniqueEntityID) {
    const task = new Task(
      {
        ...props,
      },
      id
    );

    return task;
  }
}
