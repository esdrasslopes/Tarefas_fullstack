import type { EnterpriseRepository } from "@/domain/application/repositories/entreprises-repository";
import type { Enterprise } from "@/domain/entities/enterprise";

export class InMemoryEnterpriseRepository implements EnterpriseRepository {
  public items: Enterprise[] = [];

  async findByCnpj(cnpj: string): Promise<Enterprise | null> {
    const enterprise = this.items.find((item) => item.cnpj === cnpj);

    if (!enterprise) {
      return null;
    }

    return enterprise;
  }

  async create(enterprise: Enterprise): Promise<void> {
    this.items.push(enterprise);
  }
}
