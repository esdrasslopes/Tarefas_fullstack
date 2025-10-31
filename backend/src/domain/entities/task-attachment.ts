import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Entity } from "../../core/entities/entity";

export interface TaskAttachmentProps {
  attachmentId: UniqueEntityID;
  taskId: UniqueEntityID;
}

export class Attachment extends Entity<TaskAttachmentProps> {
  get attachmentId() {
    return this.props.attachmentId;
  }

  get taskId() {
    return this.props.taskId;
  }

  static create(props: TaskAttachmentProps, id: UniqueEntityID) {
    const attachment = new Attachment(
      {
        ...props,
      },
      id
    );

    return attachment;
  }
}
