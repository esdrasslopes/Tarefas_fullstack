import { Entity } from "../../core/entities/entity";

export interface EnterpriseProps {
  id: string;
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

  get id() {
    return this.props.id;
  }

  static create(props: EnterpriseProps) {
    const enterprise = new Enterprise({
      ...props,
    });

    return enterprise;
  }
}
