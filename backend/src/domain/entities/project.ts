import { Entity } from "../../core/entities/entity";

export interface ProjectProps {
  id: string;
  enterpriseId: string;
  projectName: string;
  description: string;
}

export class Project extends Entity<ProjectProps> {
  get projectName() {
    return this.props.projectName;
  }

  get description() {
    return this.props.description;
  }

  get enterpriseId() {
    return this.props.enterpriseId;
  }

  get id() {
    return this.props.id;
  }

  static create(props: ProjectProps) {
    const project = new Project({
      ...props,
    });

    return project;
  }
}
