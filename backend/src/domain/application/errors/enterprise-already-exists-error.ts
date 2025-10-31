export class EnterpriseAlreadyExistsError extends Error {
  constructor(cnpj: string) {
    super(`Enterprise with cnpj: "${cnpj}" already exists`);
  }
}
