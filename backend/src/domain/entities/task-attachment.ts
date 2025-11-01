import { Entity } from "../../core/entities/entity";

export interface TaskAttachmentProps {
  attachmentId: string;
  taskId: string;
}

export class TaskAttachment extends Entity<TaskAttachmentProps> {
  get attachmentId() {
    return this.props.attachmentId;
  }

  get taskId() {
    return this.props.taskId;
  }

  static create(props: TaskAttachmentProps) {
    const attachment = new TaskAttachment({
      ...props,
    });

    return attachment;
  }
}
