import { Entity } from "../../core/entities/entity";

export interface UsersProps {
  id: string;
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

  get id() {
    return this.props.id;
  }

  static create(props: UsersProps) {
    const users = new Users({
      ...props,
    });

    return users;
  }
}
