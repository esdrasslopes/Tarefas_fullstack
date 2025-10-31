import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Entity } from "../../core/entities/entity";

export interface EntrerpiseProps {
  cnpj: string;
  email: string;
  password: string;
  entrepiseName: string;
}

export class Entrerpise extends Entity<EntrerpiseProps> {
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

  static create(props: EntrerpiseProps, id: UniqueEntityID) {
    const entrerpise = new Entrerpise(
      {
        ...props,
      },
      id
    );

    return entrerpise;
  }
}
