import type { EnterpriseRepository } from "@/domain/application/repositories/entreprises-repository";
import { Enterprise, type EnterpriseProps } from "@/domain/entities/enterprise";
import { randomUUID } from "crypto";

export class InMemoryEnterpriseRepository implements EnterpriseRepository {
  public items: Enterprise[] = [];

  async findByCnpj(cnpj: string): Promise<Enterprise | null> {
    const enterprise = this.items.find((item) => item.cnpj === cnpj);

    if (!enterprise) {
      return null;
    }

    return enterprise;
  }

  async create(enterpriseProps: EnterpriseProps) {
    const entreprise = Enterprise.create({
      ...enterpriseProps,
      id: randomUUID(),
    });

    this.items.push(entreprise);

    return entreprise;
  }

  async findById(id: string) {
    const enterprise = this.items.find((item) => item.id === id);

    if (!enterprise) {
      return null;
    }

    return enterprise;
  }
}
