import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Entity } from "../../core/entities/entity";

export interface UserProps {
  userGroupId?: UniqueEntityID | null;
  userAccessID?: UniqueEntityID | null;
  entrepriseID: UniqueEntityID;
  email: string;
  password: string;
  name: string;
  role: "ADMIN" | "USER";
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

  get role() {
    return this.props.role;
  }

  static create(props: UserProps, id?: UniqueEntityID) {
    const user = new User(
      {
        ...props,
      },
      id
    );

    return user;
  }
}
