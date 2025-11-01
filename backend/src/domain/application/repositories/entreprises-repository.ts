import { Enterprise, type EnterpriseProps } from "@/domain/entities/enterprise";

export interface EnterpriseRepository {
  findByCnpj(cnpj: string): Promise<Enterprise | null>;
  findById(id: string): Promise<Enterprise | null>;
  create(enterpriseProps: EnterpriseProps): Promise<Enterprise>;
}
