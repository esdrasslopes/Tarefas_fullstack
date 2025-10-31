import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Entity } from "../../core/entities/entity";

export interface UserGroupProps {
  groupName: "ADMIN" | "USER";
  userAccessId: UniqueEntityID;
}

export class UserGroup extends Entity<UserGroupProps> {
  get groupName() {
    return this.props.groupName;
  }

  get userAccessId() {
    return this.props.userAccessId;
  }

  static create(props: UserGroupProps, id?: UniqueEntityID) {
    const userGroup = new UserGroup(
      {
        ...props,
      },
      id
    );

    return userGroup;
  }
}
