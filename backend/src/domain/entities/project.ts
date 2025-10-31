import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Entity } from "../../core/entities/entity";

export interface ProjectProps {
  enterpriseId: UniqueEntityID;
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

  static create(props: ProjectProps, id: UniqueEntityID) {
    const project = new Project(
      {
        ...props,
      },
      id
    );

    return project;
  }
}
