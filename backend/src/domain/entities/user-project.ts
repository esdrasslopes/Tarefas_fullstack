import { Entity } from "../../core/entities/entity";

export interface UserProjectProps {
  userId: string;
  projectId: string;
}

export class UserProject extends Entity<UserProjectProps> {
  get userId() {
    return this.props.userId;
  }

  get projectId() {
    return this.props.projectId;
  }

  static create(props: UserProjectProps) {
    const userProject = new UserProject({
      ...props,
    });

    return userProject;
  }
}
