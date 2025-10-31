import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Entity } from "../../core/entities/entity";

export interface UsersProps {
  userAccess: string;
  role: "ADMIN" | "USER";
}

export class Users extends Entity<UsersProps> {
  get userAccess() {
    return this.props.userAccess;
  }

  get role() {
    return this.props.role;
  }

  static create(props: UsersProps, id?: UniqueEntityID) {
    const users = new Users(
      {
        ...props,
      },
      id
    );

    return users;
  }
}
