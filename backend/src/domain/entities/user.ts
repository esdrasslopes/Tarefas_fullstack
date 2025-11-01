import { Entity } from "../../core/entities/entity";

export interface UserProps {
  id: string;
  userGroupId?: string | null;
  userAccessID?: string | null;
  entrepriseID: string;
  email: string;
  password: string;
  name: string;
  role: "ADMIN" | "USER";
}

export class User extends Entity<UserProps> {
  get userGroupId() {
    return this.props.userGroupId ?? null;
  }

  get userAccessID() {
    return this.props.userAccessID ?? null;
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

  get id() {
    return this.props.id;
  }

  get entrepriseID() {
    return this.props.entrepriseID;
  }

  static create(props: UserProps) {
    const user = new User({
      ...props,
    });

    return user;
  }
}
