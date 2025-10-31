import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Entity } from "../../core/entities/entity";

export interface UsersProps {
  userGroupId: UniqueEntityID;
  userAccess: string;
}

export class Users extends Entity<UsersProps> {
  get userGroupId() {
    return this.props.userGroupId;
  }

  get userAccess() {
    return this.props.userAccess;
  }

  static create(props: UsersProps, id: UniqueEntityID) {
    const users = new Users(
      {
        ...props,
      },
      id
    );

    return users;
  }
}
