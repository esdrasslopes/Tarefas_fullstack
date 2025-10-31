import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Entity } from "../../core/entities/entity";

export interface UserProjectProps {
  userId: UniqueEntityID;
  projectId: UniqueEntityID;
}

export class UserProject extends Entity<UserProjectProps> {
  get userId() {
    return this.props.userId;
  }

  get projectId() {
    return this.props.projectId;
  }

  static create(props: UserProjectProps, id: UniqueEntityID) {
    const userProject = new UserProject(
      {
        ...props,
      },
      id
    );

    return userProject;
  }
}
