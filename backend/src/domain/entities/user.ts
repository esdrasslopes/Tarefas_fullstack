import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Entity } from "../../core/entities/entity";

export interface UserProps {
  userGroupId: UniqueEntityID;
  userAccessID: UniqueEntityID;
  email: string;
  password: string;
  name: string;
}

export class User extends Entity<UserProps> {
  get userGroupId() {
    return this.props.userGroupId;
  }

  get userAccessID() {
    return this.props.userAccessID;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get name() {
    return this.props.name;
  }

  static create(props: UserProps, id: UniqueEntityID) {
    const user = new User(
      {
        ...props,
      },
      id
    );

    return user;
  }
}
