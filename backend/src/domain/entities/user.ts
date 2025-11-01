import { Entity } from "../../core/entities/entity";

export interface UserProps {
  id: string;
  userGroupId: string;
  userAccessId: string;
  enterpriseId: string;
  email: string;
  password: string;
  name: string;
  role: "ADMIN" | "USER";
}

export class User extends Entity<UserProps> {
  get userGroupId() {
    return this.props.userGroupId;
  }

  get userAccessId() {
    return this.props.userAccessId;
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

  get enterpriseId() {
    return this.props.enterpriseId;
  }

  static create(props: UserProps) {
    const user = new User({
      ...props,
    });

    return user;
  }
}
