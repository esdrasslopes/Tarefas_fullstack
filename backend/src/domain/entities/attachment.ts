import { Entity } from "../../core/entities/entity";

export interface AttachmentProps {
  id: string;
  title: string;
  url: string;
}

export class Attachment extends Entity<AttachmentProps> {
  get title() {
    return this.props.title;
  }

  get url() {
    return this.props.url;
  }

  get id() {
    return this.props.id;
  }

  static create(props: AttachmentProps) {
    const attachment = new Attachment({
      ...props,
    });

    return attachment;
  }
}
