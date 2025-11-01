import { Entity } from "@/core/entities/entity";
import { TaskAttachmentList } from "./task-attachment-list";
import type { Optional } from "@/core/types/optional";

export interface TaskProps {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: "PENDING" | "COMPLETED";
  priority: "LOW" | "HIGH";
  createdAt: Date;
  updatedAt?: Date | null;
  completedAt?: Date | null;
  attachments: TaskAttachmentList;
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

  get updatedAt() {
    return this.props.updatedAt;
  }

  get completedAt() {
    return this.props.completedAt;
  }

  set completedAt(date: Date | undefined | null) {
    this.completedAt = date;

    this.complete();
  }

  get id() {
    return this.props.id;
  }

  get attachments() {
    return this.props.attachments;
  }

  set attachments(attachments: TaskAttachmentList) {
    this.props.attachments = attachments;

    this.touch();
  }

  private complete() {
    this.completedAt = new Date();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  static create(
    props: Optional<TaskProps, "attachments" | "createdAt" | "completedAt">
  ) {
    const task = new Task({
      ...props,
      attachments: props.attachments ?? new TaskAttachmentList(),
      createdAt: props.completedAt ?? new Date(),
    });

    return task;
  }
}
