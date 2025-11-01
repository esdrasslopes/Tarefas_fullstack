import type { Optional } from "@/core/types/optional";
import { Enterprise, type EnterpriseProps } from "@/domain/entities/enterprise";

export interface EnterpriseRepository {
  findByCnpj(cnpj: string): Promise<Enterprise | null>;
  findById(id: string): Promise<Enterprise | null>;
  create(enterpriseProps: Optional<EnterpriseProps, "id">): Promise<Enterprise>;
}
