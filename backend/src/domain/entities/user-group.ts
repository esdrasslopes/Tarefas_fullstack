import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Entity } from "../../core/entities/entity";

export interface UserGroupProps {
  groupName: "ADMIN" | "USER";
  userAccess: string;
}

export class UserGroup extends Entity<UserGroupProps> {
  get groupName() {
    return this.props.groupName;
  }

  static create(props: UserGroupProps, id: UniqueEntityID) {
    const userGroup = new UserGroup(
      {
        ...props,
      },
      id
    );

    return userGroup;
  }
}
