import { Entity } from "../../core/entities/entity";

export interface TaskAttachmentProps {
  id: string;
  attachmentId: string;
  taskId: string;
}

export class Attachment extends Entity<TaskAttachmentProps> {
  get attachmentId() {
    return this.props.attachmentId;
  }

  get taskId() {
    return this.props.taskId;
  }

  get id() {
    return this.props.id;
  }

  static create(props: TaskAttachmentProps) {
    const attachment = new Attachment({
      ...props,
    });

    return attachment;
  }
}
