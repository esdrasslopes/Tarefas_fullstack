import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Entity } from "../../core/entities/entity";

export interface EnterpriseProps {
  cnpj: string;
  email: string;
  password: string;
  entrepiseName: string;
}

export class Enterprise extends Entity<EnterpriseProps> {
  get cnpj() {
    return this.props.cnpj;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get entrepiseName() {
    return this.props.entrepiseName;
  }

  static create(props: EnterpriseProps, id?: UniqueEntityID) {
    const enterprise = new Enterprise(
      {
        ...props,
      },
      id
    );

    return enterprise;
  }
}
