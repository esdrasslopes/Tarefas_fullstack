import { Enterprise } from "@/domain/entities/enterprise";

export interface EnterpriseRepository {
  findByCnpj(cnpj: string): Promise<Enterprise | null>;
  findById(id: string): Promise<Enterprise | null>;
  create(enterprise: Partial<Enterprise>): Promise<void>;
}
