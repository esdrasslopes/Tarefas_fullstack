import { WatchedList } from "@/core/entities/watched-list";
import type { TaskAttachment } from "./task-attachment";

export class TaskAttachmentList extends WatchedList<TaskAttachment> {
  compareItems(a: TaskAttachment, b: TaskAttachment) {
    return a.attachmentId === b.attachmentId;
  }
}
