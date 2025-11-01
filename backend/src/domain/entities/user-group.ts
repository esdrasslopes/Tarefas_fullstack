import { Entity } from "../../core/entities/entity";

export interface UserGroupProps {
  id: string;
  groupName: "ADMIN" | "USER";
  userAccessId: string;
}

export class UserGroup extends Entity<UserGroupProps> {
  get groupName() {
    return this.props.groupName;
  }

  get userAccessId() {
    return this.props.userAccessId;
  }

  get id() {
    return this.props.id;
  }

  static create(props: UserGroupProps) {
    const userGroup = new UserGroup({
      ...props,
    });

    return userGroup;
  }
}
